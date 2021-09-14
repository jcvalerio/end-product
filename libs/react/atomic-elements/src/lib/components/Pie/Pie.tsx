import './Pie.scss';

import { KsButton, Loader } from '@kleeen/react/components';
import { clone, pathOr } from 'ramda';
import { drillUp, getRadialSharedOptions } from '../../utils';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { KUIConnect } from '@kleeen/core-react';
import React from 'react';
import { VisualizationWidgetProps } from '@kleeen/types';
import classnames from 'classnames';
import drilldown from 'highcharts/modules/drilldown';
import merge from 'lodash.merge';
import { useRadialDataParser } from '../../hooks/useRadialDataParser';

const bem = 'ks-pie-chart';

drilldown(Highcharts);

function PieBase(props: VisualizationWidgetProps & HighchartsReact.Props): React.ReactElement {
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
  } = parsedRadialData;

  const baseOptions = getRadialSharedOptions(parsedRadialData);
  const pieOptions: Highcharts.Options = {
    plotOptions: {
      pie: {
        innerSize: 0,
      },
    },
  };
  const options = merge({}, baseOptions, pieOptions);

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

const Pie = React.memo(KUIConnect(({ translate }) => ({ translate }))(PieBase));
export { Pie, Pie as default };
