import React, { ReactElement } from 'react';

import { FiltersAddedState } from '../../../FilterSection/FilterSection.model';
import { TranslateProps } from '@kleeen/types';

export interface ContainerProps extends TranslateProps {
  className?: string;
  container: ReactElement;
  editOn?: boolean;
  filtersAdded?: FiltersAddedState | any;
  isApplyDisabled?: boolean;
  isEditable?: boolean;
  isShow: boolean;
  onClearFilters?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onFilter?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSaveEdit?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  setIsShow?: (e: boolean) => void;
  switchOnEdit?: (bool: boolean) => void;
}

export interface OutContainerProps {
  outContainer: (element: ReactElement | null) => void;
}
