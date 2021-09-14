import { MenuListProps } from '../../../../types';

export interface FooterNavLeftProps {
  accountMenuList: MenuListProps[];
  helpUrl?: string;
  navigate?: (path: string, bool: boolean) => void;
}
