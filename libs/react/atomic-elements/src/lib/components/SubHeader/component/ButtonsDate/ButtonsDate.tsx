import './ButtonDate.scss';

import { ButtonDateProps } from './ButtonDate.model';
import { ButtonSubHeader } from '../ButtonHeader/ButtonSubHeader';
import { DatePickerInterval } from '../../../DatePickerInterval';
import React from 'react';
import { useFilters } from '@kleeen/react/hooks';

export const ButtonDate = ({ translate, hasDateFilter }: ButtonDateProps): React.ReactElement => {
  const [isShow, setIsShow] = React.useState(false);
  const [isOnClick, setIsOnClick] = React.useState(true);
  const { datePickerState, handleTimestampFilter } = useFilters(hasDateFilter);

  const handleFilterButton = (): void => {
    handleTimestampFilter();
    setIsShow(false);
  };

  React.useEffect(() => {
    setIsOnClick(!isShow);
  }, [isShow]);

  return (
    <ButtonSubHeader
      translate={translate}
      className="element-button-date"
      setIsShow={setIsShow}
      isShow={isShow}
      isOnClick={isOnClick}
    >
      <DatePickerInterval
        translate={translate}
        datePickerState={datePickerState}
        handleFilter={handleFilterButton}
        isOpen={isShow}
        isSetOpen={setIsShow}
        className="nav-top-button-date"
      ></DatePickerInterval>
    </ButtonSubHeader>
  );
};
