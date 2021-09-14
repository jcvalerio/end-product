import './SingleBarHighlightMax.scss';

import { CrossLinkingProps, useCrossLinkingMenuOnViz, useTextFormattersForViz } from '@kleeen/react/hooks';
import { KsButton, Loader } from '@kleeen/react/components';
import React, { useState } from 'react';
import { axisStyle, generalBaseOptions } from '../generalBaseOptions';
import { backToClick, deltaOfResults, localization, singleBarOptions } from './options';
import { clone, has, pathOr } from 'ramda';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { IDeltaResults } from './interfaces';
import { KUIConnect } from '@kleeen/core-react';
import { VisualizationWidgetProps } from '@kleeen/types';
import classnames from 'classnames';
import drilldown from 'highcharts/modules/drilldown';
import merge from 'lodash.merge';

const bem = 'ks-single-bar-highlight-max';

drilldown(Highcharts);

const SLICE_RESULTS_BY = 12;
const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {
  yAxis: {
    crosshair: {
      color: 'var(--primary-color)',
    },
  },
} as Highcharts.Options);

function SingleBarHighlightMaxBase({
  containerProps,
  translate,
  ...props
}: VisualizationWidgetProps & HighchartsReact.Props): React.ReactElement {
  const { context, params, widgetId = '' } = props;
  const [highChartUpdate, sethighChartUpdate] = useState({
    drillUp: null,
    drillUpButton: {},
    plotSizeX: 0,
    series: [],
    xAxis: [],
  });

  const [formatterGroupBy, formatterGroupByForTooltip, formatterValue] = useTextFormattersForViz(params);
  const results = pathOr([], ['results'], context.data);
  const format = pathOr({}, ['format'], context.data);
  const sliceResultsBy = pathOr(SLICE_RESULTS_BY, ['sliceResultsBy'], props); //split results based on sliceResultsBy integer
  const labels = pathOr({}, ['xAxis', 'labels'], format);
  const xAxis = clone(pathOr({}, ['xAxis'], format));
  const yAxis = pathOr({}, ['yAxis'], format);
  const backButtonRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
  const containerSettings = { ...containerProps, style: { height: '100%', width: '100%' } };
  const vizColors: string[] = generalBaseOptions.colors.slice(0, 10);
  const otherButtonColor = 'var(--on-surface-color)';

  if (!has('key', xAxis)) {
    xAxis['key'] = widgetId;
  }
  const { crossLinking, openMenuIfCrossLink } = useCrossLinkingMenuOnViz(props as CrossLinkingProps, {
    xAxis,
    yAxis,
  });

  let firstSliceOfResults: Array<IDeltaResults> = [];
  const xAxisCategories = clone(xAxis.categories);
  let secondHalfOfResults: Array<IDeltaResults> = [];

  const deltaResults = deltaOfResults({ crossLinkingMatrix: crossLinking, results, vizColors, xAxis, yAxis });

  if (deltaResults.length > sliceResultsBy * 2) {
    secondHalfOfResults = deltaResults.slice(sliceResultsBy, results.length - 1);

    const sum: number = secondHalfOfResults.reduce((a, b) => {
      return a + b.y;
    }, 0);
    const averageSecondHalfOfResults: number = Math.round(sum / secondHalfOfResults.length) || 0;

    xAxisCategories?.splice(sliceResultsBy, 0, localization(translate).restOfResultsLabel);
    firstSliceOfResults = deltaResults.slice(0, sliceResultsBy);
    firstSliceOfResults.push({
      name: localization(translate).restOfResultsLabel,
      y: averageSecondHalfOfResults,
      drilldown: localization(translate).restOfResultsLabel,
    });
  } else {
    firstSliceOfResults = deltaResults;
  }

  const options = singleBarOptions(
    widgetId,
    translate,
    sliceResultsBy,
    baseOptions,
    xAxis,
    xAxisCategories,
    labels,
    formatterGroupBy,
    yAxis,
    formatterValue,
    formatterGroupByForTooltip,
    otherButtonColor,
    axisStyle,
    secondHalfOfResults,
    firstSliceOfResults,
    openMenuIfCrossLink,
  );

  if (context.isLoading) {
    return <Loader />;
  }

  return (
    <div className={classnames(bem, 'singlebar-hightlightmax-container')}>
      <div
        className={classnames(`${bem}__cta--back`, 'back-to')}
        id={`singlebar-hightlightmax-${widgetId}-container__backButton`}
        ref={backButtonRef}
      >
        <KsButton
          onClick={() => {
            backToClick(highChartUpdate, xAxis, sliceResultsBy, translate, backButtonRef);
          }}
        >
          ◁ {localization(translate).backTo}
        </KsButton>
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={clone(options)}
        {...props}
        containerProps={containerSettings}
        callback={(e) => {
          sethighChartUpdate(e);
        }}
      />
    </div>
  );
}

const SingleBarHighlightMax = React.memo(
  KUIConnect(({ translate }) => ({ translate }))(SingleBarHighlightMaxBase),
);
export { SingleBarHighlightMax, SingleBarHighlightMax as default };
