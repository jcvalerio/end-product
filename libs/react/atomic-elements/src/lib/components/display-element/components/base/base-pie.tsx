import { BaseDisplayComponentsProps } from '@kleeen/types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { clone } from 'ramda';
import { displayWithVizHeight } from '../../styles/shared.styles';
import { generalBaseOptions } from '../../../generalBaseOptions';
import { getOptions } from '../../../../utils/highchart-options';
import merge from 'lodash.merge';

interface BasePieProps extends BaseDisplayComponentsProps {
  data: number[];
}

const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {} as Highcharts.Options);

export function BasePie({ data, highlighted }: BasePieProps) {
  const containerProps = {
    style: {
      height: highlighted ? 'var(--wh-1XS)' : displayWithVizHeight,
      width: highlighted ? 'var(--wh-1XS)' : displayWithVizHeight,
      marginRight: 'var(--pm-2XS)',
    },
  };
  const options = getOptions(baseOptions);
  const pieOptions: Highcharts.Options = merge({}, options, {
    chart: {
      margin: [0, 0, 0, 0],
      plotBorderWidth: null,
      spacing: [0, 0, 0, 0],
      type: 'pie',
    },
    plotOptions: {
      ...baseOptions.plotOptions,
      pie: {
        allowPointSelect: false,
        dataLabels: {
          enabled: false,
        },
        size: highlighted ? 32 : 16,
        states: {
          hover: {
            enabled: false,
            halo: null,
          },
        },
      },
    },
    series: [
      {
        data,
      },
    ],
  } as Highcharts.Options);

  return (
    <HighchartsReact containerProps={containerProps} highcharts={Highcharts} options={clone(pieOptions)} />
  );
}
