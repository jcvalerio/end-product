import './donut.scss';

import { KsButton, Loader } from '@kleeen/react/components';
import { addDonutSubTitle, addDonutTitle, drillUp, getRadialSharedOptions } from '../../utils';
import { clone, pathOr } from 'ramda';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { KUIConnect } from '@kleeen/core-react';
import React from 'react';
import { VisualizationWidgetProps } from '@kleeen/types';
import classnames from 'classnames';
import drilldown from 'highcharts/modules/drilldown';
import { getAggregationLabel } from '../../../types';
import { isEmpty } from 'ramda';
import { isValidArray } from '@kleeen/common/utils';
import merge from 'lodash.merge';
import { useRadialDataParser } from '../../hooks/useRadialDataParser';

const bem = 'ks-donut';

drilldown(Highcharts);

function DonutBase(props: VisualizationWidgetProps & HighchartsReact.Props): React.ReactElement {
  const parsedRadialData = useRadialDataParser(props);

  const isLoading = pathOr(true, ['context', 'isLoading']);
  if (isLoading(props)) {
    return <Loader />;
  }

  const {
    backButtonRef,
    containerProps,
    highchartState: { highChartUpdate, setHighChartUpdate },
    localization,
    results: { aggregations, formattedResults },
  } = parsedRadialData;
  const dTitle = getAverageForAll(formattedResults),
    dSubtitle = getAggregationLabel(aggregations, true) || null;

  const baseOptions = getRadialSharedOptions(parsedRadialData);
  const donutOptions: Highcharts.Options = {
    chart: {
      events: {
        load() {
          if (!isEmpty(dTitle)) {
            addDonutTitle(this, dTitle.toString());
          }
          if (!isEmpty(dSubtitle)) {
            addDonutSubTitle(this, dSubtitle);
          }
        },
        redraw() {
          // TODO: @cafe move this into a generic function
          if (!isEmpty(dTitle)) {
            addDonutTitle(this, dTitle.toString());
          }
          if (!isEmpty(dSubtitle)) {
            addDonutSubTitle(this, dSubtitle);
          }
        },
      },
    },
    plotOptions: {
      pie: {
        innerSize: '60%',
      },
    },
  };
  const options = merge({}, baseOptions, donutOptions);

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

const Donut = React.memo(KUIConnect(({ translate }) => ({ translate }))(DonutBase));
export { Donut, Donut as default };

//#region private members

function getAverageForAll(results: { y: number }[]) {
  if (!isValidArray(results)) {
    return 0;
  }

  const total = results.reduce((acc, curr) => acc + curr.y, 0);
  return Math.round(total / results.length);
}

//#endregion
