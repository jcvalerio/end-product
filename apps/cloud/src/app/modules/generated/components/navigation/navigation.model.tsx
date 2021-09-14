interface MenuOption {
  areYouSure?: boolean;
  func?: () => void;
  icon?: string;
  openInNewTab?: boolean;
  path: string;
  title: string;
  type?: string;
}

export interface NavigationSettings {
  accountMenuOptions: MenuOption[];
  helpUrl?: string;
  logo: string;
  menuOptions: MenuOption[];
}
