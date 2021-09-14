import { NavType } from '@kleeen/types';

function navHistory(navigate: any, path: string, history?: any) {
  history?.push(path);
  navigate(path, false);
}

export function executeFunc(func: any) {
  if (func) {
    func();
    return;
  }
}

export function validateOpenInNewTab(
  navigate: any,
  path: string,
  e?: any,
  type?: string,
  history?: any,
  openInNewTab?: boolean,
) {
  if (openInNewTab) {
    window.open(path, '_blank');
  } else {
    if (type === NavType.customUrl) {
      window.open(path, '_self');
    } else {
      e?.preventDefault();
      navHistory(navigate, path, history);
    }
  }
}
