import './ButtonSelect.scss';

import React, { useState } from 'react';

import { ButtonSelectProps } from './ButtonSelect.model';
import { ButtonSubHeader } from '../ButtonHeader/ButtonSubHeader';
import { SelectList } from '../../../SelectList/SelectList';
import { useViewsFilteredByAccess } from '@kleeen/react/hooks';
import { ViewOptionFormattedType } from '@kleeen/types';
import classNames from 'classnames';

const defaultIconKey = 'Apps';
export const ButtonSelect = ({
  viewOptions,
  handleChangeTab,
  onTabIndexChanged,
  value,
  translate,
  taskName,
}: ButtonSelectProps): React.ReactElement | null => {
  const [iconView, setIconView] = useState(viewOptions[value]?.viewId || defaultIconKey);
  const options = useViewsFilteredByAccess(viewOptions, taskName) as ViewOptionFormattedType[];
  const navigation = viewOptions[value]?.name;
  const hasViewSwitch = options?.length > 1;
  const viewSwitchText = hasViewSwitch ? 'View switch' : undefined;

  if (!navigation) return null;

  const handleOnChange = (optionValue, rawOption) => {
    if (viewOptions[optionValue]?.viewId) {
      setIconView(viewOptions[optionValue]?.viewId || defaultIconKey);
    }
    if (handleChangeTab) {
      handleChangeTab(optionValue);
    }
    if (onTabIndexChanged) {
      onTabIndexChanged(optionValue as number, rawOption);
    }
  };

  if (viewOptions.length < 2) return null;

  return (
    <ButtonSubHeader
      icon={iconView}
      className={classNames('element-button-select', { 'has-view-switch': hasViewSwitch })}
      name={navigation}
      subName={viewSwitchText}
      translate={translate}
      isDisabled={!hasViewSwitch}
    >
      <SelectList onChange={handleOnChange} options={options} value={value} taskName={taskName} />
      {hasViewSwitch && (
        <div className="icon-outlined">
          <svg className="MuiSvgIcon-root element-select-arrow">
            <path d="M7 10l5 5 5-5z"></path>
          </svg>
        </div>
      )}
    </ButtonSubHeader>
  );
};
