import { Key } from 'react';

export interface KeyValueProps {
  highlighted?: boolean;
  keyComponent: string;
  layoutProps?: KeyValueStyleProps;
  valueComponent: JSX.Element;
}

export interface KeyValueStyleProps {
  keyWidth?: Key;
  valueWidth?: Key;
}
