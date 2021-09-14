import './ButtonSummary.scss';

import { ReactElement, useEffect, useState } from 'react';
import { useEntityDetailsEventHandler, useKleeenActions } from '@kleeen/react/hooks';

import { ButtonSubHeader } from '../ButtonHeader/ButtonSubHeader';
import { ContainerHeader } from '../ContainerHeader/ContainerHeader';
import { EntityDetailsSectionProps } from '../../../EntityDetailsSection/EntityDetailsSection';
import { OutContainerProps } from '../ContainerHeader/ContainerHeader.model';
import { SummaryPanel } from '../../../summary-panel';
import { TranslateProps } from '@kleeen/types';
import { getUpdateRequestPayload } from '../../../../utils';

export function ButtonSummary({
  entityDetails,
  isEditable,
  outContainer,
  taskName,
  translate,
}: EntityDetailsSectionProps & OutContainerProps & TranslateProps): ReactElement {
  const [attributeEventList, { addEvent, clearEventList }] = useEntityDetailsEventHandler();
  const { updateRequest } = useKleeenActions(taskName);
  const [editOn, setEditOn] = useState(false);
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    return clearEventList;
  }, []);

  function onCancel(): void {
    // TODO: @cafe cancel or clear accumulated events
  }

  function onSave(): void {
    const payload = getUpdateRequestPayload(attributeEventList);

    updateRequest(payload);

    // Turn-off edit mode
    setEditOn(false);

    // Clean-up previous updates
    clearEventList();
  }

  return (
    <>
      <ButtonSubHeader
        className="element-button-filter"
        icon="AssignmentOutlined"
        isShow={isShow}
        name={translate('app.subHeader.buttonSummary.summaryDetails')}
        setIsShow={setIsShow}
        translate={translate}
      ></ButtonSubHeader>
      <ContainerHeader
        className="button-container-summary-actions"
        container={
          <SummaryPanel
            entityDetails={entityDetails}
            isEditing={editOn}
            isFromButtonSummary={true}
            registerEvents={addEvent}
            taskName={taskName}
          />
        }
        editOn={editOn}
        filtersAdded={attributeEventList}
        isEditable={isEditable}
        isShow={isShow}
        onSaveEdit={onSave}
        outContainer={outContainer}
        setIsShow={setIsShow}
        switchOnEdit={setEditOn}
        translate={translate}
      />
    </>
  );
}
