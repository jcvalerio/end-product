import { generalBaseOptions, maxLabelLength, radialLegend } from '../../components/generalBaseOptions';

import Highcharts from 'highcharts';
import { RadialDataParserResult } from '../../hooks/useRadialDataParser';
import merge from 'lodash.merge';

export type HighchartsLegendClickEvent = Highcharts.PointLegendItemClickEventObject & {
  target: {
    drilldown?: string;
    hcEvents: {
      click: [
        {
          fn: () => void;
        },
      ];
    };
  };
};

export interface GetBaseOptionsParams {
  highChartUpdate: any;
  backButtonRef: any;
}

export function showDrillUpButton({ highChartUpdate, backButtonRef }: GetBaseOptionsParams) {
  backButtonRef.current.style.right = 'calc(100% - ' + (highChartUpdate.plotSizeX + 15) + 'px)';
  backButtonRef.current.classList.add('show');
}

export function drillUp({ backButtonRef, highChartUpdate }: GetBaseOptionsParams) {
  if (highChartUpdate?.drillUpButton) {
    highChartUpdate.drillUp();
    setTimeout(() => {
      backButtonRef.current.classList.remove('show');
    });
  }
}

export function getRadialSharedOptions({
  axis: { xAxis, yAxis },
  backButtonRef,
  highchartState: { highChartUpdate },
  localization,
  openMenuIfCrossLink,
  groupBy,
  results: { firstSliceOfResults, secondHalfOfResults },
  textFormatters: { formatterGroupBy, formatterGroupByForTooltip, formatterValue },
}: RadialDataParserResult) {
  const radialOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      marginBottom: 0,
      marginTop: 0,
    },
    drilldown: {
      series: [
        {
          type: 'pie',
          name: localization.restOfResultsLabel,
          id: localization.restOfResultsLabel,
          data: secondHalfOfResults,
        },
      ],
    },
    plotOptions: {
      pie: {
        borderColor: 'var(--surface-color)',
        borderWidth: 0.5,
        point: {
          events: {
            legendItemClick(e: Highcharts.PointLegendItemClickEventObject & HighchartsLegendClickEvent) {
              if (e.target.drilldown != undefined) {
                const hcEventTarget = e.target.hcEvents.click[0];
                hcEventTarget.fn();
                if (highChartUpdate?.drillUpButton) {
                  showDrillUpButton({
                    backButtonRef,
                    highChartUpdate,
                  });
                }
              } else {
                return false;
              }
            },
          },
        },
      },
    },
    legend: {
      ...radialLegend,
      labelFormatter() {
        if (groupBy.formatType === 'timestamp' && this.name !== localization.restOfResultsLabel) {
          return formatterGroupByForTooltip(this.name);
        }
        const name =
          this.name !== localization.restOfResultsLabel ? (formatterGroupBy(this.name) as string) : this.name;
        return name.length > maxLabelLength
          ? [...name].splice(0, maxLabelLength).join('').trim() + '...'
          : name;
      },
      width: '30%',
    },
    series: [
      {
        type: 'pie',
        data: firstSliceOfResults,
        events: {
          click: (e) => {
            openMenuIfCrossLink(e);
            setTimeout(() => {
              if (highChartUpdate?.drillUpButton) {
                showDrillUpButton({
                  highChartUpdate,
                  backButtonRef,
                });
              }
            });
          },
        },
      },
    ],
    tooltip: {
      formatter(this) {
        return this.point.name !== localization.restOfResultsLabel
          ? `${formatterGroupByForTooltip(this.point.name)}: ${formatterValue(this.point.y)}`
          : this.point.name;
      },
      pointFormat: '{point.name}: {point.y}',
    },
    xAxis,
    yAxis,
  };
  const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, radialOptions);
  return baseOptions;
}

export function getLocalizationValues(translate) {
  return {
    restOfResultsLabel: translate('app.pieWidget.restOfResults') || '',
    backTo: translate('app.button.back') || '',
  };
}
