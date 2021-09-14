import { Attribute, ContextMenuDataPoint, CrossLinkingMatrix } from '@kleeen/types';

import { isNilOrEmpty } from '@kleeen/common/utils';
import { path } from 'ramda';
import useAttributeContextMenu from './useAttributeContextMenu';

export interface CrossLinkingProps {
  attributes?: any[];
  context?: { data: { crossLinking: any[][] } };
  widgetId?: string;
}

interface CrossLinkingMenuOnViz {
  crossLinking: CrossLinkingMatrix;
  openMenuIfCrossLink: (e: any) => void;
}

interface AxisProp {
  xAxis: { key: string };
  yAxis?: { key: string };
}

const useCrossLinkingMenuOnViz = (
  props: CrossLinkingProps,
  { xAxis, yAxis }: AxisProp,
): CrossLinkingMenuOnViz => {
  const { openMenu } = useAttributeContextMenu();
  const crossLinking = props.context?.data?.crossLinking || [];
  const attribute: Attribute | undefined = path<Attribute>(['attributes', 0], props);

  const openMenuIfCrossLink = (e) => {
    const value = xAxis && path(['point', 'options', xAxis.key], e);

    if (isNilOrEmpty(value)) return;

    const dataPoints: ContextMenuDataPoint[] = [
      {
        attribute,
        value,
      },
    ];

    if (props.attributes.length > 1 && yAxis) {
      const yValue = path(['point', 'options', yAxis.key], e);
      dataPoints.push({
        attribute: props.attributes[1],
        value: yValue,
      });
    }

    openMenu({
      e,
      widgetId: props.widgetId,
      dataPoints,
    });
  };

  return {
    crossLinking,
    openMenuIfCrossLink,
  };
};

export default useCrossLinkingMenuOnViz;
