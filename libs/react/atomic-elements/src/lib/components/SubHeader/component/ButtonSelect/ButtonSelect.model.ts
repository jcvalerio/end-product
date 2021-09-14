import { TranslateProps, ViewOption } from '@kleeen/types';

export interface ButtonSelectProps extends TranslateProps {
  viewOptions: ViewOption[];
  handleChangeTab: (e) => void;
  onTabIndexChanged?: (index: number, option: ViewOption) => void;
  value: string;
  taskName?: string;
}
