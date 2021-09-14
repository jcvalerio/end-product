import './Waterfall.scss';

import { KsButton, Loader } from '@kleeen/react/components';
import React, { useState } from 'react';
import { clone, pathOr } from 'ramda';
import { getPlottingResultsData, getWaterfallSpecificOptions, splitResults } from './waterfallOptions';

import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';
import { ILocalization } from './waterfallTypes';
import { KUIConnect } from '@kleeen/core-react';
import { VisualizationWidgetProps } from '@kleeen/types';
import drilldown from 'highcharts/modules/drilldown';
import { generalBaseOptions } from '../generalBaseOptions';
import { getWaterfallTooltipOptions } from './tooltipOptions';
import merge from 'lodash.merge';

/**
 * 'HighchartsMore' is required for waterfall type
 * 'drilldown' is required for data splitting (too many columns looks crowded)
 */
drilldown(Highcharts);
HighchartsMore(Highcharts);

const SLICE_RESULTS_BY = 12;

function WaterfallComponent({
  containerProps,
  context,
  params,
  translate,
  widgetId,
  ...props
}: VisualizationWidgetProps & HighchartsReact.Props): React.ReactElement {
  const [highChartUpdate, setHighChartUpdate] = useState({
    drillUp: null,
    drillUpButton: {},
    plotSizeX: 0,
    series: [],
    xAxis: [],
  });

  const results = pathOr([], ['results'], context.data);
  const getCategoricalXAxisCategories = pathOr([], ['format', 'xAxis', 'categories'], context.data);
  const sliceResultsBy = pathOr(SLICE_RESULTS_BY, ['sliceResultsBy'], props);

  const backButtonRef = React.createRef<HTMLDivElement>();

  const containerSettings = { ...containerProps, style: { height: '100%', width: '100%' } };

  const localization = {
    restOfResultsLabel: translate('app.pieWidget.restOfResults') || 'Other',
    backTo: translate('app.button.back') || 'Back',
  } as ILocalization;
  /** Added all necessary info (delta, color, index, originalY) to results */
  const completedResults = getPlottingResultsData(results);
  /** Further investigate - (?) this will work only if isResultsArray is true <!> */
  const xAxisCategories = getCategoricalXAxisCategories
    ? getCategoricalXAxisCategories
    : results.map((itemOfRes) => itemOfRes[0]);
  /** Needed for tooltip message before mutating xAxisCategories to "Other" */
  const originalCategoryForOther = xAxisCategories[sliceResultsBy];

  const { firstSliceOfResults, secondSliceOfResults, averageSecondSliceOfResults } = splitResults(
    completedResults,
    sliceResultsBy,
    xAxisCategories,
    localization,
  );

  const mergedOptions: Highcharts.Options = merge(
    {},
    generalBaseOptions,
    getWaterfallSpecificOptions(
      localization,
      sliceResultsBy,
      widgetId,
      xAxisCategories,
      firstSliceOfResults,
      secondSliceOfResults,
      params,
    ),
    getWaterfallTooltipOptions(
      completedResults,
      xAxisCategories,
      secondSliceOfResults,
      sliceResultsBy,
      localization,
      originalCategoryForOther,
      averageSecondSliceOfResults,
      params,
    ),
  );
  if (context.isLoading) {
    return <Loader />;
  }
  const backToClick = (): void => {
    const categories = clone(xAxisCategories);
    categories.splice(sliceResultsBy, 0, localization.restOfResultsLabel);
    highChartUpdate.xAxis[0].setCategories(categories);

    if (highChartUpdate?.drillUpButton) {
      highChartUpdate.drillUp();
      backButtonRef.current.classList.remove('show');
    }
  };

  return (
    <div className="waterfall-container">
      <div ref={backButtonRef} className="back-to" id={`waterfall-${widgetId}-container__backButton`}>
        <KsButton onClick={backToClick}>◁ {localization.backTo}</KsButton>
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={clone(mergedOptions)}
        {...props}
        containerProps={containerSettings}
        callback={(e) => {
          setHighChartUpdate(e);
        }}
      />
    </div>
  );
}

const Waterfall = React.memo(KUIConnect(({ translate }) => ({ translate }))(WaterfallComponent));
export { Waterfall, Waterfall as default };
