import { CrossLinkingProps, useCrossLinkingMenuOnViz, useTextFormattersForViz } from '@kleeen/react/hooks';

import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { VisualizationWidgetProps } from '@kleeen/types';
import { formatRadialResults } from '@kleeen/frontend/utils';
import { getLocalizationValues } from '../utils';
import { otherColors } from '../components/generalBaseOptions';
import { pathOr } from 'ramda';
import { useState } from 'react';

const SLICE_RESULTS_BY = 10;

export interface RadialDataParserResult {
  axis: {
    xAxis;
    yAxis;
  };
  backButtonRef;
  containerProps;
  groupBy;
  highchartState: {
    highChartUpdate;
    setHighChartUpdate;
  };
  localization;
  openMenuIfCrossLink;
  results: {
    aggregations;
    firstSliceOfResults;
    formattedResults;
    secondHalfOfResults;
  };
  textFormatters: {
    formatterGroupBy;
    formatterGroupByForTooltip;
    formatterValue;
  };
}

export function useRadialDataParser({
  translate,
  ...props
}: VisualizationWidgetProps & HighchartsReact.Props): RadialDataParserResult {
  const { context, params } = props;
  const [highChartUpdate, setHighChartUpdate] = useState({
    drillUp: null,
    drillUpButton: {},
    plotSizeX: 0,
  });
  const { data = {} } = context;
  const sliceResultsBy = pathOr(SLICE_RESULTS_BY, ['sliceResultsBy'], props); //split results based on sliceResultsBy integer
  const aggregations = pathOr('', ['transformation'], params.value);
  const { results = [], format = {} } = data;
  const { xAxis = {}, yAxis = {} } = format || {};
  const { crossLinking, openMenuIfCrossLink } = useCrossLinkingMenuOnViz(props as CrossLinkingProps, {
    xAxis,
    yAxis,
  });
  const backButtonRef = React.createRef<HTMLDivElement>();
  const localization = getLocalizationValues(translate);

  const { groupBy } = props.params;
  const [formatterGroupBy, formatterGroupByForTooltip, formatterValue] = useTextFormattersForViz(
    props.params,
  );

  const formattedResults = formatRadialResults(results, xAxis, undefined, crossLinking, yAxis);

  let firstSliceOfResults = [],
    secondHalfOfResults = [];

  if (formattedResults.length > sliceResultsBy * 2) {
    secondHalfOfResults = formattedResults.slice(sliceResultsBy, results.length - 1);
    const sum: number = secondHalfOfResults.reduce((a, b) => {
      return b.hasOwnProperty('y') ? a + b.y : 0;
    }, 0);
    const averageSecondHalfOfResults: number = Math.round(sum / secondHalfOfResults.length) || 0;

    firstSliceOfResults = formattedResults.slice(0, sliceResultsBy);
    firstSliceOfResults.push({
      name: localization.restOfResultsLabel,
      y: averageSecondHalfOfResults,
      z: undefined,
      color: otherColors.lightFade,
      drilldown: localization.restOfResultsLabel,
    });
  } else {
    firstSliceOfResults = formattedResults;
  }

  const containerProps = { ...props.containerProps, style: { height: '100%', width: '100%' } };

  return {
    axis: {
      xAxis,
      yAxis,
    },
    backButtonRef,
    containerProps,
    groupBy,
    highchartState: {
      highChartUpdate,
      setHighChartUpdate,
    },
    localization,
    openMenuIfCrossLink,
    results: {
      aggregations,
      firstSliceOfResults,
      formattedResults,
      secondHalfOfResults,
    },
    textFormatters: {
      formatterGroupBy,
      formatterGroupByForTooltip,
      formatterValue,
    },
  };
}
