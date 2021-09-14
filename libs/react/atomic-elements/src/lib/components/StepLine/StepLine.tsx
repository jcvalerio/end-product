import { clone, pathOr } from 'ramda';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import React from 'react';
import { VisualizationWidgetProps } from '@kleeen/types';
import { generalBaseOptions } from '../generalBaseOptions';
import { getOptions } from './options';

export function StepLine({
  containerProps,
  context,
  params,
  ...props
}: VisualizationWidgetProps & HighchartsReact.Props): JSX.Element | null {
  const results = pathOr([], ['results'], context.data);
  const format = pathOr({}, ['format'], context.data);

  const options = getOptions(results, format, generalBaseOptions, params);

  const containerSettings = { ...containerProps, style: { height: '100%', width: '100%' } };

  if (context.isLoading) {
    return <Loader />;
  }

  return options !== null ? (
    <HighchartsReact
      highcharts={Highcharts}
      options={clone(options)}
      {...props}
      containerProps={containerSettings}
    />
  ) : null;
}

export default React.memo(StepLine);
