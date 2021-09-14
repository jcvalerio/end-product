import { Attribute } from './attributes';
import { CustomWidget } from './custom-widget';
import { VizParams } from './widget';

export interface Action {
  addModalAttributes?: (Attribute & {
    params: VizParams;
  })[];
  areYouSure: boolean;
  component?: CustomWidget | undefined;
  description?: string;
  displayName: string;
  id?: string;
  name: string;
  type: string;
}
