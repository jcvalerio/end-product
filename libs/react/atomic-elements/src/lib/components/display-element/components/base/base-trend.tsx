import { BaseDisplayComponentsProps, TrendFormat } from '@kleeen/types';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import classNames from 'classnames';
import { clone } from 'ramda';
import { generalBaseOptions } from '../../../generalBaseOptions';
import { getOptions } from '../../../../utils/highchart-options';
import { isNilOrEmpty } from '@kleeen/common/utils';
import merge from 'lodash.merge';
import { useStyles } from '../../styles/base-trend.styles';

interface BaseTrendProps extends BaseDisplayComponentsProps {
  color?: string;
  dataFormatted: TrendFormat[];
  dataRaw?: number[];
  highlightEnd?: boolean;
  highlightStart?: boolean;
  highlighted?: boolean;
}

export function BaseTrend(props: BaseTrendProps) {
  const classes = useStyles();
  return (
    <div
      className={classNames({
        [classes.content]: !props.highlighted,
        [classes.mainTrend]: props.highlighted,
      })}
    >
      <Trend {...props} />
    </div>
  );
}

//#region Private members
const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {} as Highcharts.Options);

function Trend({
  color = 'var(--viz1)',
  dataFormatted,
  dataRaw,
  highlightEnd,
  highlightStart,
}: BaseTrendProps) {
  const containerProps = {
    style: { height: '100%', width: '100%' },
  };
  const options = getOptions(baseOptions);
  const series = [{ type: 'area', data: dataFormatted }];

  const needsHighlight = highlightEnd || highlightStart;

  if (!isNilOrEmpty(dataRaw) && needsHighlight) {
    const dataLength = dataRaw.length;

    if (highlightStart) {
      addDashedLine(dataRaw[0], dataLength, series);
    }

    if (highlightEnd) {
      addDashedLine(dataRaw[dataLength - 1], dataLength, series);
    }
  }

  const areaOptions: Highcharts.Options = merge({}, options, {
    chart: {
      margin: [1, 1, 1, 3],
      plotBorderWidth: null,
      spacing: [0, 0, 0, 0],
      type: 'area',
    },
    colors: [`hsla(${color}, 1)`],
    plotOptions: {
      area: {
        fillColor: `hsla(${color}, .2)`,
        lineWidth: 1,
        threshold: null,
      },
      line: {
        lineWidth: 1,
      },
      series: {
        enableMouseTracking: false,
        marker: {
          enabled: false,
        },
      },
    },
    series,
  } as Highcharts.Options);

  return (
    <HighchartsReact containerProps={containerProps} highcharts={Highcharts} options={clone(areaOptions)} />
  );
}

function addDashedLine(
  position: TrendFormat,
  resultsLength: number,
  series: {
    color?: string;
    dashStyle?: string;
    data: TrendFormat[] | TrendFormat[][];
    type: string;
  }[],
) {
  series.push({
    color: 'var(--on-surface-color)',
    dashStyle: 'Dash',
    data: [
      [0, position],
      [resultsLength - 1, position],
    ],
    type: 'line',
  });
}
//#endregion
