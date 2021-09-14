import { isNilOrEmpty } from '@kleeen/common/utils';

export function getAppComputedStylePropertyValue(propertyName: string): string {
  const app = document.querySelector('.app>div:first-child');
  if (app) {
    const primaryColor = window.getComputedStyle(app).getPropertyValue(propertyName);
    if (!isNilOrEmpty(primaryColor)) {
      return primaryColor.trim();
    }
  }
  return '';
}

export function getAppPrimaryColor(): string {
  return getAppComputedStylePropertyValue('--primary-color');
}

export function getAppSecondaryColor(): string {
  return getAppComputedStylePropertyValue('--secondary-color');
}
