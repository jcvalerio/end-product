import { SubHeaderProps } from '../../SubHeader.model';
import { TranslateProps } from '@kleeen/types';
export interface ButtonHeaderProps extends SubHeaderProps, TranslateProps {
  name?: string;
  icon?: string;
  subName?: string;
  className?: string;
  countElement?: number;
  setIsShow?: (e: boolean) => void | boolean;
  isShow?: boolean;
  isDisabled?: boolean;
  isOnClick?: boolean;
}

export interface IconDynamicProps {
  icon: string;
}
