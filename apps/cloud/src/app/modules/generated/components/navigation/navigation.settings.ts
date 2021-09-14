import { NavigationSettings } from './navigation.model';

export const getSettings = (logout: () => void): NavigationSettings => {
  return {
    accountMenuOptions: [
      {
        title: 'User Preferences',
        path: '/profile/endUserPreferences/edit',
      },
      {
        title: 'Logout',
        path: '/logout',
        func: logout,
      },
    ],
    helpUrl: undefined,
    logo: `assets/logo.png`,
    menuOptions: [
      {
        title: `Workflow 1`,
        path: `/workflow-1`,
        icon: `ks-navigation-b3pio1mzb1DZRz8wTUt5Sm`,
        type: `workflow`,
        openInNewTab: false,
        areYouSure: false,
      },
    ],
  };
};
