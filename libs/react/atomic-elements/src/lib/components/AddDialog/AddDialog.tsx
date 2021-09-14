import { BaseAddDialogProps, KsButton } from '@kleeen/react/components';
import { Key, MouseEvent, useEffect } from 'react';
import { Dialog as KsDialog, useStyles } from './AddDialog.styles';
import { useEntityDetailsEventHandler, useTheme } from '@kleeen/react/hooks';

import { AttributeInputEvents } from '@kleeen/types';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { InputElement } from '../input-element';
import { KeyValue } from '../key-value';
import { Translate } from '@kleeen/core-react';
import capitalize from 'lodash.capitalize';
import classnames from 'classnames';

type BuildEntityProps = {
  attributeEventList: AttributeInputEvents[];
  attributesIds: Key[];
};

type EntityAndParamsType = {
  entity: string;
  params: { [key: string]: string };
  hasErrors?: boolean;
};

type EntityByParamsType = Record<string, { [key: string]: string | boolean }>;

const layoutProps = {
  keyWidth: 125,
  valueWidth: 300,
};

const bem = 'ks-dialog';

export function AddDialog({
  open,
  onAction,
  onClose,
  parent,
  title,
  taskName,
  action,
}: BaseAddDialogProps): JSX.Element {
  const attributes = action.addModalAttributes;
  const { themeClass } = useTheme();
  const [attributeEventList, { addEvent, clearEventList }] = useEntityDetailsEventHandler();
  const classes = useStyles();

  useEffect(() => {
    return clearEventList;
  }, []);

  const registerEvents = (event: AttributeInputEvents): void => {
    addEvent(event);
  };

  const onSave = (e: MouseEvent): void => {
    const baseAttribute = attributes.find(({ isDisplayValue }) => isDisplayValue);
    const entityKey = baseAttribute?.params?.baseModel || attributes[0]?.params?.baseModel;
    const form = buildEntity({ attributeEventList, attributesIds: attributes.map(({ id }) => id) });
    let hasErrors = false;
    Object.keys(form).forEach((attr) => {
      if (form[attr].hasErrors) hasErrors = true;
    });
    if (hasErrors) return;

    const isFormValid = Object.keys(form).includes(entityKey);
    const payload = {
      entity: form,
      parent,
      entityKey,
    };

    if (!isFormValid) return;

    onAction(e, payload);
    onClose();
  };

  useEffect(() => {
    return () => clearEventList();
  }, []);

  function handleClose(): void {
    onClose();
  }

  return (
    <KsDialog
      aria-labelledby="form-dialog-title"
      className={classnames(`${bem}`, themeClass)}
      onClose={handleClose}
      open={open}
    >
      <DialogTitle id="form-dialog-title">
        {typeof title === 'string' ? capitalize(title.toString()) : title}
      </DialogTitle>
      <DialogContent>
        {attributes.map((attr) => (
          <div className={classnames(`${bem}__form-group`, classes.formGroup)}>
            <KeyValue
              key={attr.id}
              keyComponent={attr.label}
              layoutProps={layoutProps}
              valueComponent={
                <InputElement
                  attributes={[attr]}
                  elements={attr.elements}
                  registerEvents={registerEvents}
                  params={attr.params}
                  taskName={taskName}
                  widgetId={`add_dialog_${attr.id}`}
                />
              }
            />
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <KsButton onClick={handleClose}>
          <Translate id="app.modal.action.cancel" type="html" />
        </KsButton>
        <KsButton color="primary" onClick={onSave}>
          {title}
        </KsButton>
      </DialogActions>
    </KsDialog>
  );
}
//#region private methods

function buildEntity({ attributeEventList, attributesIds }: BuildEntityProps): EntityByParamsType {
  const widgetsData: EntityAndParamsType[] = attributeEventList.reduce((acc, event) => {
    const data = attributesIds.includes(event.id) ? event.onSave() : null;

    if (data?.entity) acc.push(data as EntityAndParamsType);

    return acc;
  }, []);

  const data = widgetsData.reduce((acc: EntityByParamsType, current: EntityAndParamsType) => {
    return {
      ...acc,
      [current.entity]: {
        ...current.params,
        hasErrors: current.hasErrors,
      },
    };
  }, {});

  return data;
}

//#endregion
