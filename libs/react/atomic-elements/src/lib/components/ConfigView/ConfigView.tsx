import './ConfigView.scss';

import { ConfigureLayoutStyle, SnackBarSection } from '@kleeen/react/atomic-elements';
import React, { useEffect, useState } from 'react';

import CardSection02 from '../CardSection/CardSection02';
import { useEntityDetailsEventHandler } from '@kleeen/react/hooks';

const ConfigView = ({ widgets, taskName, entityActions }): JSX.Element => {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [attributeEventList, eventList] = useEntityDetailsEventHandler();
  const classes = ConfigureLayoutStyle();
  function snackBarRegisterEvents(event) {
    eventList.addEvent(event);
  }
  function onInputChange(hasChanged) {
    setShowSnackBar(hasChanged);
  }
  const mainContainerId = `container-id-${classes.configCardSection}`;

  useEffect(() => {
    const { clearEventList } = eventList;
    return clearEventList;
  }, []);

  function snackBarOnCancel() {
    setShowSnackBar(false);
    attributeEventList.map((event) => event.onCancel());
  }
  function snackBarOnSave() {
    setShowSnackBar(false);
    const widgetsData = attributeEventList.map((event) => event.onSave()).filter((data) => data);
    const dataList = widgetsData
      .filter((current) => current.entity)
      .map((current) => {
        return {
          ...current,
          params: {
            ...current.params,
          },
        };
      });

    dataList.map((data) => entityActions.updateRequest(data));
  }

  return (
    <div
      id={mainContainerId}
      className={`${classes.configCardSection} ${showSnackBar ? classes.snackbarNavTop : ''} `}
    >
      <CardSection02
        justifyContent={'center'}
        hideSaveAndClose
        widgets={widgets}
        containerId={mainContainerId}
        taskName={taskName}
        registerEvents={snackBarRegisterEvents}
        onInputChange={onInputChange}
      />
      <SnackBarSection
        entityActions={entityActions}
        className="on-bottom"
        showSnackBar={showSnackBar}
        actions={[
          {
            type: 'CUSTOM',
            label: 'SAVE',
            func: snackBarOnSave,
          },
          {
            type: 'CUSTOM',
            label: 'CANCEL',
            func: snackBarOnCancel,
          },
        ]}
      />
    </div>
  );
};

export default ConfigView;
