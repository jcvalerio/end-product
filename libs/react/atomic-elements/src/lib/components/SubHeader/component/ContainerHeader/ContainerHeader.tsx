import './ContainerHeader.scss';

import { ContainerProps, OutContainerProps } from './ContainerHeader.model';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { IconDynamic } from '../ButtonHeader/ButtonSubHeader';
import { KsButton } from '@kleeen/react/components';
import React from 'react';

const Container = ({
  className,
  container,
  editOn,
  isApplyDisabled,
  isEditable,
  isShow,
  onClearFilters,
  onFilter,
  onSaveEdit,
  switchOnEdit,
  translate,
}: ContainerProps): React.ReactElement => {
  return (
    <div
      className={`${className}  button-container-header element-sub-header dataview ${
        isShow && 'element-button-show-container-header'
      }`}
    >
      <div className={`container-header ${onFilter ? 'filter-header' : ''}`}>{container}</div>
      <div className="button-container-actions-header">
        {onClearFilters && (
          <KsButton onClick={onClearFilters}>
            <div className="icon-actions">
              <CloseIcon fontSize="large" />
            </div>
            <div className="name-actions">{translate('app.subHeader.container.button.clear')}</div>
          </KsButton>
        )}
        {onFilter && (
          <KsButton onClick={onFilter} disabled={isApplyDisabled}>
            <div className="icon-actions">
              <IconDynamic icon={'ks-filter'} />
            </div>
            <div className="name-actions">{translate('app.subHeader.container.button.apply')}</div>
          </KsButton>
        )}
        {switchOnEdit && isEditable && (
          <div className={`switcher-container ${editOn ? 'edit-on' : ''}`}>
            {editOn ? (
              <>
                <KsButton onClick={onSaveEdit}>
                  <div className="icon-actions">
                    <CheckIcon />
                  </div>
                  <div className="name-actions">{translate('app.subHeader.container.button.saveEdit')}</div>
                </KsButton>
                <KsButton onClick={() => switchOnEdit(false)}>
                  <div className="icon-actions">
                    <ClearIcon />
                  </div>
                  <div className="name-actions">{translate('app.subHeader.container.button.cancelEdit')}</div>
                </KsButton>
              </>
            ) : (
              <KsButton onClick={() => switchOnEdit(true)}>
                <div className="icon-actions">
                  <EditIcon />
                </div>
                <div className="name-actions">{translate('app.subHeader.container.button.edit')}</div>
              </KsButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// TODO: @guaria this should be a effect instead of a component.
export const ContainerHeader = ({
  className,
  container,
  editOn,
  filtersAdded,
  isApplyDisabled,
  isEditable,
  isShow,
  onClearFilters,
  onFilter,
  onSaveEdit,
  outContainer,
  switchOnEdit,
  translate,
}: ContainerProps & OutContainerProps): null => {
  React.useEffect(() => {
    if (isShow) {
      setTimeout(
        () =>
          outContainer(
            <Container
              className={className}
              container={container}
              editOn={editOn}
              isApplyDisabled={isApplyDisabled}
              isEditable={isEditable}
              isShow={isShow}
              onClearFilters={onClearFilters}
              onFilter={onFilter}
              onSaveEdit={onSaveEdit}
              switchOnEdit={switchOnEdit}
              translate={translate}
            />,
          ),
        1,
      );
    } else {
      outContainer(null);
    }
  }, [isShow, filtersAdded, editOn]);

  return null;
};
