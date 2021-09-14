import { Action, AttributeProps, GenericFunctions, ParentProps } from '@kleeen/types';

export interface PageIntroSectionProps {
  actions: Action[];
  attributes: AttributeProps[];
  description?: string;
  entity?: string;
  entityActions?: GenericFunctions;
  parent?: ParentProps;
  showActions: boolean;
  showAvatar: boolean;
  showDesc: boolean;
  showTitle: boolean;
  title?: string;
}
