import './EntityDetailsSection.scss';

import { AttributeInputEvents, DisplayMediaType, Translate } from '@kleeen/types';
import { Avatar, Collapse } from '@material-ui/core';
import { KsButton, KsMenuContainer } from '@kleeen/react/components';
import { ReactElement, useEffect, useState } from 'react';
import { useEntityDetailsEventHandler, useKleeenActions, useKleeenContext } from '@kleeen/react/hooks';

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { KUIConnect } from '@kleeen/core-react';
import MuiButton from '@material-ui/core/Button';
import MuiToolbar from '@material-ui/core/Toolbar';
import MuiTooltip from '@material-ui/core/Tooltip';
import { SummaryPanel } from '../summary-panel';
import classnames from 'classnames';
import { getUpdateRequestPayload } from '../../utils';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { pathOr } from 'ramda';
import { styled } from '@material-ui/core';
import { useStyles } from './entity-details-section.styles';

const bem = 'ks-entity-details-section';
export interface EntityDetailsSectionProps {
  displayTaskName: string;
  entityDetails: any[]; // TODO: @cafe add better types here
  isEditable: boolean;
  objectValue?: string;
  onChangeFilterVisible?: (isVisible: boolean) => void;
  taskName: string;
  translate?: Translate;
}

// TODO: @cafe move this to a .styles file
const Paper = styled(KsMenuContainer)({
  borderRadius: 0,
});

const Button = styled(MuiButton)({
  boxShadow: 'none',
  width: 'var(--wh-1XL)',
  '&:hover': {
    boxShadow: 'none',
  },
});

const Toolbar = styled(MuiToolbar)({
  backgroundColor: 'var(--surface-color)',
  'border-radius': 'var(--pm-0)',
  display: 'flex',
  justifyContent: 'center',
});

export function EntityDetailsSectionBase({ translate, ...props }: EntityDetailsSectionProps): ReactElement {
  const { objectValue, taskName } = props;
  if (isNilOrEmpty(taskName)) {
    // TODO: @jcvalerio should throw an exception
    // throw new Error('The attribute taskName was null');
    return null;
  }
  const { updateRequest } = useKleeenActions(taskName);
  const classes = useStyles();
  const [attributeEventList, { addEvent, clearEventList }] = useEntityDetailsEventHandler();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [open, setOpen] = useState(true);
  const entityData = useKleeenContext<{ isLoading: boolean }>(taskName);
  const getDisplayMedia = pathOr({ value: '' }, ['entity', objectValue, 'displayMedia']);
  const displayMedia = getDisplayMedia(entityData);
  const shouldDisplayAvatar =
    !entityData.isLoading && displayMedia.type === DisplayMediaType.Src && imageLoaded;

  useEffect(() => {
    return clearEventList;
  }, []);

  function handleDrawerOpen(): void {
    setOpen(true);

    if (props.onChangeFilterVisible) {
      props.onChangeFilterVisible(true);
    }
  }

  function handleDrawerClose(): void {
    setOpen(false);

    if (props.onChangeFilterVisible) {
      props.onChangeFilterVisible(false);
    }
  }

  function onCancel(): void {
    // TODO: @cafe cancel or clear accumulated events
  }

  function onSave(): void {
    const payload = getUpdateRequestPayload(attributeEventList);
    const hasChanges = !isNilOrEmpty(payload);
    if (hasChanges) {
      updateRequest(payload);
    }
    clearEventList();
    setEditing(false);
  }

  function registerEvents(event: AttributeInputEvents): void {
    addEvent(event);
  }

  return open ? (
    <Paper className={classnames(bem, 'entity-details-section')} elevation={3}>
      <div className={classnames(`${bem}__container`, 'paper-container')}>
        <div className={classnames(`${bem}__attributes`, 'attributes-container')}>
          <div className={classnames(`${bem}__navigation`, 'attributes-navigation')}>
            <KsButton
              className={classnames(`${bem}__navigation--left`, 'attributes-navigation-left')}
              onClick={handleDrawerClose}
            >
              <ArrowLeftIcon className={classnames(`${bem}__close`, 'icon-close')} />
              {translate('app.subHeader.buttonSummary.summaryDetails')}
            </KsButton>
            {props.isEditable && (
              <KsButton
                className={classnames(
                  `${bem}__navigation--right`,
                  'attributes-navigation-right',
                  isEditing && 'attributes-navigation-edit-on',
                )}
                onClick={() => setEditing(!isEditing)}
              >
                {isEditing
                  ? translate('app.subHeader.container.button.editOff')
                  : translate('app.subHeader.container.button.editOn')}
              </KsButton>
            )}
          </div>
          <div>
            <Collapse in={shouldDisplayAvatar}>
              <Avatar
                onLoad={() => setImageLoaded(true)}
                alt="Ks"
                src={displayMedia.value}
                className={classes.avatar}
              />
            </Collapse>
          </div>
          <SummaryPanel
            entityDetails={props.entityDetails}
            isEditing={isEditing}
            layoutProps={{
              columnGap: 55,
              containerPadding: 32,
              keyValuePadding: 21,
              keyWidth: 144,
              valueWidth: 178,
            }}
            registerEvents={registerEvents}
            taskName={props.taskName}
          />
        </div>
        {isEditing && (
          <Toolbar>
            <Button className={classnames(`${bem}__cta`, 'primary-button')} onClick={onSave}>
              {translate('app.subHeader.container.button.save')}
            </Button>
          </Toolbar>
        )}
      </div>
    </Paper>
  ) : (
    <Paper elevation={3} className={classnames(`${bem}__container--close`, classes.drawerClose)}>
      <MuiTooltip title="View your entity" placement="top">
        <EditOutlinedIcon className={classes.iconEntity} onClick={handleDrawerOpen} />
      </MuiTooltip>
    </Paper>
  );
}

export const EntityDetailsSection = KUIConnect(({ translate }) => ({ translate }))(EntityDetailsSectionBase);
