import './donut-variant.scss';

import { HighchartsLegendClickEvent, drillUp, getRadialSharedOptions, showDrillUpButton } from '../../utils';
import { KsButton, Loader } from '@kleeen/react/components';
import { clone, pathOr } from 'ramda';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { KUIConnect } from '@kleeen/core-react';
import React from 'react';
import { VisualizationWidgetProps } from '@kleeen/types';
import classnames from 'classnames';
import drilldown from 'highcharts/modules/drilldown';
import merge from 'lodash.merge';
import { useRadialDataParser } from '../../hooks/useRadialDataParser';
import { vizColors } from '../generalBaseOptions';

const bem = 'ks-donut-variant';

drilldown(Highcharts);

function DonutVariantBase(props: VisualizationWidgetProps & HighchartsReact.Props): React.ReactElement {
  const { context } = props;
  const parsedRadialData = useRadialDataParser(props);

  if (context.isLoading) {
    return <Loader />;
  }

  const {
    backButtonRef,
    containerProps,
    highchartState: { highChartUpdate, setHighChartUpdate },
    localization,
    openMenuIfCrossLink,
    results: { firstSliceOfResults },
  } = parsedRadialData;

  const baseOptions = getRadialSharedOptions(parsedRadialData);
  const donutVariantOptions: Highcharts.Options = {
    series: [
      {
        colors: vizColors.lightFade,
        data: firstSliceOfResults,
        enableMouseTracking: false,
        innerSize: 130,
        size: 138,
        showInLegend: false,
        type: 'pie',
      },
      {
        data: firstSliceOfResults,
        events: {
          click(e) {
            const { selected, index: selectedIndex } = e.point;
            this.chart.series[0].points[selectedIndex].select(!selected, true);
            this.chart.series[1].points[selectedIndex].select(!selected, true);
            openMenuIfCrossLink(e);
            setTimeout(() => {
              if (highChartUpdate?.drillUpButton) {
                showDrillUpButton({
                  highChartUpdate,
                  backButtonRef,
                });
              }
            });
            return false;
          },
        },
        innerSize: 138,
        size: 160,
        type: 'pie',
      },
    ],
    legend: {
      itemStyle: {
        fontSize: 'var(--tx-M)',
      },
      align: 'left',
      itemMarginBottom: 4,
      itemMarginTop: 4,
    },
    plotOptions: {
      pie: {
        innerSize: 130,
        size: 160,
        point: {
          events: {
            legendItemClick(e: HighchartsLegendClickEvent) {
              // This legendItemClick event overrides the one from getBaseOptions
              if (e.target.name !== localization.restOfResultsLabel) {
                return false;
              }

              const hcEventTarget = e.target.hcEvents.click[0];
              hcEventTarget.fn();
              if (highChartUpdate?.drillUpButton) {
                showDrillUpButton({ highChartUpdate, backButtonRef });
              }
            },
          },
        },
      },
    },
  };
  const options = merge({}, baseOptions, donutVariantOptions);

  return (
    <div className={classnames(bem, 'High-charts')}>
      <div ref={backButtonRef} className={classnames(`${bem}__back`, 'back-to')}>
        <KsButton
          onClick={() => {
            drillUp({ backButtonRef, highChartUpdate });
          }}
        >
          ◁ {localization.backTo}
        </KsButton>
      </div>
      <div className={classnames(`${bem}__shadow`, 'donut-shadow')}></div>
      <HighchartsReact
        containerProps={containerProps}
        highcharts={Highcharts}
        options={clone(options)}
        {...props}
        callback={(e) => {
          setHighChartUpdate(e);
        }}
      />
    </div>
  );
}

const DonutVariant = React.memo(KUIConnect(({ translate }) => ({ translate }))(DonutVariantBase));
export { DonutVariant, DonutVariant as default };
