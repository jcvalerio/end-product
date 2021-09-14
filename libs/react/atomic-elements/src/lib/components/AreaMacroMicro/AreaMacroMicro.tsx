import './AreaMacroMicro.scss';

import { clone, pathOr } from 'ramda';

import Highcharts from 'highcharts/highstock';
import HighchartsHighstock from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import React from 'react';
import { VisualizationWidgetProps } from '@kleeen/types';
import { generalBaseOptions } from '../generalBaseOptions';
import { getOptions } from './options';
import merge from 'lodash.merge';

const baseOptions: Highcharts.Options = merge(
  {
    yAxis: {
      opposite: false,
    },
  },
  generalBaseOptions,
  {} as Highcharts.Options,
);

function AreaMacroMicroBase({ context, params, ...props }: VisualizationWidgetProps & HighchartsReact.Props) {
  const results = pathOr([], ['results'], context.data);
  const format = pathOr({}, ['format'], context.data);
  const containerProps = pathOr({}, ['containerProps'], props);

  const containerSettings = { ...containerProps, style: { height: '100%', width: '100%' } };

  const options = getOptions(format, baseOptions, params, results);

  if (context.isLoading) {
    return <Loader />;
  }

  return (
    <HighchartsReact
      highcharts={HighchartsHighstock}
      options={clone(options)}
      constructorType={'stockChart'}
      {...props}
      containerProps={containerSettings}
    />
  );
}

const AreaMacroMicro = React.memo(AreaMacroMicroBase);
export { AreaMacroMicro, AreaMacroMicro as default };
