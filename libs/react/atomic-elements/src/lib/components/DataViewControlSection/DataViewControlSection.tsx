import './DataViewControlSection.scss';

import {
  ActionDialogs,
  ActionsSection,
  AddDialogPayload,
  KsAutoRefreshControl,
  RefreshControl,
} from '@kleeen/react/components';
import { Container, Title, Typography } from './DataViewControlSection.styles';
import { HeaderTitle, HeaderTitleEllipsis } from '../HeaderTitle';
import { ReactElement, useState } from 'react';
import { isEmpty, isNil } from 'ramda';
import { isNilOrEmpty, sortByKeys } from '@kleeen/common/utils';
import { useGetDisplayValue, useKleeenActions } from '@kleeen/react/hooks';

import { Action } from '@kleeen/types';
import { DataViewControlSectionProps } from './DataViewControlSection.model';
import Grid from '@material-ui/core/Grid';
import MuiTooltip from '@material-ui/core/Tooltip';
import { ViewSwitcher } from './ViewSwitcher';
import classnames from 'classnames';
import { isAddAction } from '@kleeen/render-utils';

const bem = 'ks-data-view-control-section';

export function DataViewControlSection(props: DataViewControlSectionProps): ReactElement {
  const {
    objectValue,
    onTabIndexChanged,
    results,
    selectedOption,
    taskName,
    title,
    viewOptions = [],
  } = props;
  if (isNilOrEmpty(taskName)) {
    throw new Error(`Value cannot be null. Parameter name: taskName`);
  }
  const { refreshPage } = useKleeenActions(taskName);
  const [actionPayload, setActionPayload] = useState({});
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const { displayValue, format } = useGetDisplayValue({ objectValue, taskName });

  const viewOptionsBySortOrder = sortByKeys(viewOptions, ['viewOrder', 'viewId']);

  const getSelectedOption = () => {
    const hastToChooseADefaultViewOption =
      isNilOrEmpty(selectedOption) && !isNilOrEmpty(viewOptionsBySortOrder) && !isNil(onTabIndexChanged);

    if (hastToChooseADefaultViewOption) {
      const [defaultViewOption] = viewOptionsBySortOrder;
      onTabIndexChanged(0, defaultViewOption);
      return defaultViewOption;
    }
    return viewOptionsBySortOrder.find(
      (viewOption) => selectedOption && viewOption.viewId === selectedOption.viewId,
    );
  };
  // TODO: @cafe move this logic to a shared util and re-use it in HeaderAndSubSectionsComponent
  const viewOptionProps = getSelectedOption();

  const addActions = getAddActions();
  const entityName = isNilOrEmpty(viewOptionProps?.entityName) ? props.entity : viewOptionProps.entityName;

  function dispatchAction({ action, payload }: { action: Action; payload: AddDialogPayload }): void {
    const isCustomDialogOpen = isCustomOpen;
    const needsConfirmation = action?.areYouSure;

    if (isCustomDialogOpen && needsConfirmation) {
      setActionPayload(payload);
      setIsConfirmationOpen(true);
    } else {
      props.entityActions.addRequest(payload || actionPayload);
    }
  }

  function getAddActions(): Action[] {
    const localActions = isNilOrEmpty(viewOptionProps?.actions) ? props.actions : viewOptionProps.actions;
    return (localActions || []).filter(isAddAction);
  }

  function handleClick(action: Action): void {
    if (action?.component) {
      setIsCustomOpen(true);
    } else if (action?.areYouSure) {
      setIsConfirmationOpen(true);
    }
  }

  function handleIsConfirmationOpenChange(): void {
    setIsConfirmationOpen(!isConfirmationOpen);
  }

  function handleIsCustomOpenChange(): void {
    setIsCustomOpen(!isCustomOpen);
  }

  return (
    <>
      <Container className={classnames(bem, 'dataview-control-section')} maxWidth="xl">
        <Grid alignItems="center" className={classnames(`${bem}__container`, 'main-container')} container>
          {props.showAvatar && (
            <Grid
              alignItems="center"
              className={classnames(`${bem}__avatar-container`)}
              container
              item
              sm={2}
              xs={4}
            >
              <AvatarSection />
            </Grid>
          )}
          <Grid
            className={classnames(`${bem}__typography`, 'typography-ellipsis')}
            container
            direction="column"
          >
            <MuiTooltip
              title={
                <HeaderTitle displayValue={displayValue} format={format} title={title} subTitle={results} />
              }
              placement="top-start"
            >
              <Title>
                <Typography variant="h2" component="h1">
                  <HeaderTitleEllipsis
                    displayValue={displayValue}
                    format={format}
                    subTitle={results}
                    title={title}
                  />
                </Typography>
              </Title>
            </MuiTooltip>
            {results != null && (
              <Typography className={classnames(`${bem}__results`, 'results')}>
                <>{results} Results</>
              </Typography>
            )}
          </Grid>
        </Grid>
        {viewOptionsBySortOrder.length > 1 && (
          <Grid
            alignItems="center"
            className={classnames(`${bem}__options`, 'options')}
            container
            data-testid="view-switcher"
          >
            <ViewSwitcher
              handleChangeTab={props.handleChangeTab}
              onTabIndexChanged={props.onTabIndexChanged}
              showDropDown={props.showDropDown}
              taskName={taskName}
              value={viewOptionsBySortOrder.indexOf(viewOptionProps)}
              viewOptions={viewOptionsBySortOrder}
            />
          </Grid>
        )}
        <Grid alignItems="center" className="actions" container data-testid="page-actions">
          {!props.hideRefreshControl && (
            <>
              <RefreshControl onRefresh={refreshPage} taskName={taskName} />
              <KsAutoRefreshControl taskName={taskName} onRefresh={refreshPage} />
            </>
          )}
          <ActionsSection actions={addActions} entity={entityName} handleAddClick={handleClick} />
        </Grid>
      </Container>
      {addActions.map((action) => (
        <ActionDialogs
          action={action}
          attributes={props.attributes}
          dispatchAction={dispatchAction}
          entity={entityName}
          isConfirmationOpen={isConfirmationOpen}
          isCustomOpen={isCustomOpen}
          key={`${action.name}-dialogs`}
          onIsConfirmationOpenChange={handleIsConfirmationOpenChange}
          onIsCustomOpenChange={handleIsCustomOpenChange}
          parent={props.parent}
          taskName={taskName}
        />
      ))}
    </>
  );
}

function AvatarSection(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect id="blue_square" fill="#069" x="0" y="0" width="100%" height="100%" />
    </svg>
  );
}

export default DataViewControlSection;
