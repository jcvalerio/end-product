import { LanguageInputWidget } from '../user-preferences/components/widget-j-lm-ucm-lbu-m-6-nat-lq-75-g-v-gm';
import { ThemeInputWidget } from '../user-preferences/components/widget-qu-q-1-fbn-a-db-97-gxbk-5-uzw-yr';
import { Translate } from '@kleeen/types';
import { VersionSummaryWidget } from '../user-preferences/components/widget-version-summary';

export function getWidgets(translate: Translate) {
  return [
    {
      actions: [],
      addModalAttributes: [],
      attributes: [],
      chartType: `[WIDGET] CUSTOM`,
      component: LanguageInputWidget,
      description: undefined,
      id: `97f61b40-c376-47ed-acce-89cc8a9e94f0`,
      params: {},
      statisticalType: undefined,
      title: translate('entities.endUserPreferences.locale'),
      viableSolutions: [],
    },
    {
      actions: [],
      addModalAttributes: [],
      attributes: [],
      chartType: `[WIDGET] CUSTOM`,
      component: ThemeInputWidget,
      description: undefined,
      id: `c661bddb-5835-416f-9ab4-bd4a5ba2d0c1`,
      params: {},
      statisticalType: undefined,
      title: translate('entities.endUserPreferences.theme'),
      viableSolutions: [],
    },
    {
      actions: [],
      addModalAttributes: [],
      attributes: [],
      chartType: `[WIDGET] CUSTOM`,
      component: VersionSummaryWidget,
      description: undefined,
      id: `297e6f33-b441-491a-a4b7-ed5a7252ea85`,
      params: {},
      statisticalType: undefined,
      title: translate('entities.endUserPreferences.version'),
      viableSolutions: [],
      viewId: 'ks-view-dDFg8iyGDDBag2MB8JoqKo',
    },
  ];
}
