import { ForwardRefExoticComponent, RefAttributes } from 'react';

import { Translate } from '@kleeen/types';

export interface ItemType {
  label: string;
  key: string;
  path?: string;
  icon?: string;
  handleOnClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: ItemType) => void;
}

export interface KsMenuProps {
  anchorEl: null | HTMLElement;
  className?: string;
  handleClose: (e: React.MouseEvent<Document, MouseEvent>) => void;
  options: ItemType[];
  open: boolean;
  handleOnClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: ItemType) => void;
  accessKey?: string;
}

export interface InputElementProps {
  currentItem: ItemType;
  setOpen: (open: boolean) => void;
  translate: Translate;
}

export interface KsDropDownProps {
  options: ItemType[];
  handleOnClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: ItemType) => void;
  selectedItem?: ItemType;
  translate?: Translate;
  InputElement?: ForwardRefExoticComponent<InputElementProps & RefAttributes<HTMLElement>>;
}
