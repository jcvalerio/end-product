import React, { useEffect, useState } from 'react';
import { clone, pathOr } from 'ramda';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import { VisualizationWidgetProps } from '@kleeen/types';
import { generalBaseOptions } from '../generalBaseOptions';
import { getOptions } from './options';
import { isValidArray } from '@kleeen/common/utils';
import merge from 'lodash.merge';

const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {
  yAxis: {
    crosshair: {
      color: 'var(--primary-color)',
    },
  },
} as Highcharts.Options);

export function AreaMasterDetail({
  context,
  params,
  ...props
}: VisualizationWidgetProps & HighchartsReact.Props) {
  const results = pathOr([], ['results'], context.data);
  const format = pathOr({}, ['format'], context.data);
  const xAxis = pathOr({}, ['xAxis'], format);
  const yAxis = pathOr({}, ['yAxis'], format);
  const containerProps = pathOr({}, ['containerProps'], props);

  const containerSettings = { ...containerProps, style: { height: '65%', width: '100%' } };
  const containerMasterSettings = { style: { height: '35%', width: '100%' } };

  const optionsForMainChart = getOptions(results, format, baseOptions, null, null);

  const [mainChartOptions, setMainChartOptions] = useState(null);
  const optionsForDetailChart = getOptions(
    results,
    format,
    baseOptions,
    setMainChartOptions,
    mainChartOptions,
  );

  const [detailChartOptions, setDetailChartOptions] = useState(null);

  useEffect(() => {
    if (isValidArray(results)) {
      const _optionsForMainChart: Highcharts.Options = merge({}, optionsForMainChart, {
        yAxis: {
          ...yAxis,
          ceiling: Math.max(...results),
        },
        series: [{ data: results }],
      } as Highcharts.Options);

      const _optionsForDetailChart: Highcharts.Options = merge({}, optionsForDetailChart, {
        series: [{ data: results }],
        yAxis: {
          ...yAxis,
          ceiling: Math.max(...results),
        },
        xAxis: {
          ...xAxis,
          plotBands: [],
        },
      } as Highcharts.Options);

      setMainChartOptions(_optionsForMainChart);
      setDetailChartOptions(_optionsForDetailChart);

      return () => {
        setMainChartOptions(null);
        setDetailChartOptions(null);
      };
    }
  }, [results]);

  if (context.isLoading) {
    return <Loader />;
  }

  return mainChartOptions !== null && detailChartOptions !== null ? (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={clone(mainChartOptions)}
        {...props}
        containerProps={containerSettings}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={clone(detailChartOptions)}
        containerProps={containerMasterSettings}
      />
    </>
  ) : null;
}

export default React.memo(AreaMasterDetail);
