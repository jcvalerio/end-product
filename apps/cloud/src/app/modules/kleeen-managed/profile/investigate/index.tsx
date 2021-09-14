import { CardSectionLayout, InvestigationCard } from '@kleeen/types';
import {
  INVESTIGATION_URL_PARAM,
  getDecodedInvestigationCard,
  resolveInvestigation,
} from '@kleeen/investigations';
import { useEffect, useState } from 'react';

import { CardSection } from '@kleeen/react/atomic-elements';
import { InvestigateBar } from './components';
import { InvestigateProps } from './investigate.model';
import { KUIConnect } from '@kleeen/core-react';
import { KsErrorScreen } from '@kleeen/react/components';
import { Translate } from '@kleeen/core-react';
import classNames from 'classnames';
import { getSettings } from '../../../generated/components/navigation/navigation.settings';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './investigate.styles';
import { useUrlQueryParams } from '@kleeen/react/hooks';

const bem = 'ks-investigate';
const settings = getSettings(() => {});

function Investigate({ translate }: InvestigateProps) {
  const isError = false;
  const classes = useStyles();
  const { paramsBasedOnRoute } = useUrlQueryParams();
  const [investigation, setInvestigation] = useState<InvestigationCard>();
  const [widgets, setWidgets] = useState([]);

  const firstWidget = widgets[widgets.length - 1];
  const investigationParam = paramsBasedOnRoute[INVESTIGATION_URL_PARAM];

  function onClose() {
    window.close();
  }

  useEffect(() => {
    const decodedInvestigationCard = getDecodedInvestigationCard(investigationParam);
    setInvestigation(decodedInvestigationCard);
  }, [investigationParam]);

  useEffect(() => {
    if (isNilOrEmpty(investigation)) {
      return;
    }

    const parsedWidgets = resolveInvestigation({ investigationCard: investigation, cardLevel: 0 });

    if (!isNilOrEmpty(parsedWidgets)) {
      setWidgets(parsedWidgets);
    }
  }, [investigation]);

  return (
    <div className={bem}>
      <InvestigateBar
        logo={settings.logo}
        onClose={onClose}
        title={firstWidget?.title || '[Original Focus]'} // TODO: @cafe add missing i18n here
        translate={translate}
      />
      <div className={classNames(`${bem}__container`, classes.container)}>
        {isError ? (
          <KsErrorScreen
            text={<Translate id="app.investigation.fullScreenError" type="html" />}
            textStyle={{
              color: 'white',
              display: 'flex',
              margin: 'auto',
              opacity: '50%',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          />
        ) : (
          <CardSection
            cardSectionLayout={CardSectionLayout.SingleWideColumn}
            justifyContent="center"
            key="investigation"
            taskName="investigation"
            widgets={widgets}
          />
        )}
      </div>
    </div>
  );
}

export default KUIConnect(({ translate }) => ({ translate }))(Investigate);
