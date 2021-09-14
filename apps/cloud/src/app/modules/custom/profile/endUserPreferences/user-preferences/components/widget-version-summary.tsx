import {
  AggregationType,
  Attribute,
  CustomWidgetProps,
  ElementDisplayType,
  TransformationResponse,
  TranslateProps,
} from '@kleeen/types';
import { CardWidget02, SummaryStatistics } from '@kleeen/react/atomic-elements';

import { KUIConnect } from '@kleeen/core-react';
import { environment } from '@kleeen/environment';

const data: TransformationResponse[] = [
  {
    crossLinking: [],
    format: {
      max: null,
      min: null,
      severityBad: null,
      severityGood: null,
      severityLevels: null,
    },
    results: environment.deployment.version,
    transformation: AggregationType.NoAggregation,
  },
];

function VersionSummaryWidgetBase({ translate, ...props }: CustomWidgetProps & TranslateProps) {
  const attributes: Attribute[] = [
    {
      aggregation: AggregationType.NoAggregation,
      crossLinking: [],
      deepDataType: 'string',
      elements: { displayComponent: ElementDisplayType.Label },
      formatType: 'string',
      isFilterable: {
        in: false,
        out: false,
      },
      label: translate('entities.endUserPreferences.version'),
      name: 'version',
      settings: {
        isAvatarEditable: false,
        isFilledByEU: false,
        isEditable: false,
      },
    },
  ];

  return (
    <CardWidget02 {...props} icon={false} title={translate('entities.endUserPreferences.version')}>
      <SummaryStatistics attributes={attributes} data={data} widgetId={props.widget.id} />
    </CardWidget02>
  );
}

export const VersionSummaryWidget = KUIConnect(({ translate }) => ({ translate }))(VersionSummaryWidgetBase);
