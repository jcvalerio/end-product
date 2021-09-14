import { AppSettings } from '@kleeen/types';
import appSettings from './app.json';
import roleAccessKey from './role-access-keys.json';
import roleAccessKeyCustom from './role-access-keys.custom.json';
import stringsTranslate from './strings-translations.json';
import theme from './theme.json';

export const app = appSettings as unknown as AppSettings;
export * from './default-user-role';
export * from './font-family';

export { roleAccessKey, roleAccessKeyCustom, stringsTranslate, theme };
