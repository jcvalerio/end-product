import { AccessControl, KUIConnect } from '@kleeen/core-react';
import { CardSection02, PageIntroSection, SnackBarSection } from '@kleeen/react/atomic-elements';
import React, { useState } from 'react';
import {
  useEntityDetailsEventHandler,
  useGetNavigationStyle,
  useLocalization,
  useTheme,
} from '@kleeen/react/hooks';

import { LANGUAGE_ENTITY_KEY } from './user-preferences/components/widget-j-lm-ucm-lbu-m-6-nat-lq-75-g-v-gm';
import { THEME_ENTITY_KEY } from './user-preferences/components/widget-qu-q-1-fbn-a-db-97-gxbk-5-uzw-yr';
import { getWidgets } from './settings/card-section-widgets';
import { pageIntroSectionActions } from './settings/page-intro-section-actions';
import { pageIntroSectionAttributes } from './settings/page-intro-section-attributes';
import { roleAccessKeyTag } from '@kleeen/common/utils';
import { useStyles } from './styles/styles';

function ConfigTask({ translate }) {
  const taskName = `userPreferences - hola mundo - testing`;
  const pageIntroSectionDescription = undefined;
  const classes = useStyles();
  const cardSectionContainerId = `container-id-${classes.configCardSection}`;
  const cardSectionWidgets = getWidgets(translate);
  const [showSubmit, setShowSubmit] = useState(false);
  const [attributeEventList, { addEvent, clearEventList }] = useEntityDetailsEventHandler();
  const { setLanguage } = useLocalization();

  const { theme, setTheme } = useTheme();

  const { isNavLeft } = useGetNavigationStyle();

  const currentNavigationStyle = isNavLeft ? classes.snackbarNavLeft : classes.snackbarNavTop;

  React.useEffect(() => {
    return clearEventList;
  }, []);

  function onCancel() {
    setShowSubmit(false);
    attributeEventList.map((event) => event.onCancel());
  }

  function onInputChange(hasChanged) {
    setShowSubmit(hasChanged);
  }

  function onSave() {
    setShowSubmit(false);
    const widgetsData = attributeEventList.map((event) => event.onSave()).filter((data) => data);

    const languageChanges = widgetsData.find((data) => data.entity === LANGUAGE_ENTITY_KEY);
    const themeChanges = widgetsData.find((data) => data.entity === THEME_ENTITY_KEY);
    const newTheme = {
      ...theme,
      kit: themeChanges.params.kit,
    };

    const newLanguage = languageChanges.params;

    setTheme(newTheme);
    setLanguage(newLanguage);
  }

  function registerEvents(event) {
    addEvent(event);
  }

  return (
    <AccessControl id={roleAccessKeyTag(`navigation.${taskName}`)}>
      <div className={classes.configTask}>
        <div className={classes.pageIntro}>
          <PageIntroSection
            actions={pageIntroSectionActions}
            attributes={pageIntroSectionAttributes}
            description={pageIntroSectionDescription}
            entity={''}
            entityActions={{}}
            showActions={false}
            title={translate('app.globalNav.userPreferences')}
          />
        </div>
        <div
          id={cardSectionContainerId}
          className={`${classes.configCardSection} ${showSubmit ? currentNavigationStyle : ''} `}
        >
          <CardSection02
            justifyContent="center"
            taskName={taskName}
            widgets={cardSectionWidgets}
            hideSaveAndClose={true}
            onInputChange={onInputChange}
            registerEvents={registerEvents}
            containerId={cardSectionContainerId}
          />
        </div>
        <div>
          <SnackBarSection
            actions={[
              {
                type: 'CUSTOM',
                label: 'SAVE',
                func: onSave,
              },
              {
                type: 'CUSTOM',
                label: 'CANCEL',
                func: onCancel,
              },
            ]}
            entity=""
            entityActions={{}}
            selectedRows={[]}
            setSelectedRows={[]}
            showSelectAndExecute={false}
            showSnackBar={showSubmit}
          />
        </div>
      </div>
    </AccessControl>
  );
}

export default KUIConnect(({ translate }) => ({ translate }))(ConfigTask);
