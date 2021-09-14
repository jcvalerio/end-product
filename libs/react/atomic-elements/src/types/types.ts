export interface MenuListProps {
  func?: () => void;
  icon?: string;
  path: string;
  title: string;
  id?: number;
  areYouSure?: boolean;
  openInNewTab?: boolean;
  type?: string;
}

export interface NavProps {
  accountMenuList: MenuListProps[];
  accountName?: string;
  helpUrl?: string;
  logo: string;
  menuList: MenuListProps[];
  productName?: string;
}
