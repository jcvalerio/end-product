import { TranslateProps, ViewOption } from '@kleeen/types';

import { ActionsManagerProps } from '@kleeen/react/components';
import { EntityDetailsSectionProps } from '../EntityDetailsSection/EntityDetailsSection';
import { FilterProps } from '../SubHeader/component/ButtonFilter/ButtonFilter.model';

export interface HeaderAndSubSectionsProps extends TranslateProps {
  actionsProps: ActionsManagerProps;
  filters?: FilterProps[];
  handleChangeTab: (e: boolean) => void;
  onTabIndexChanged?: (index: number, option: ViewOption) => void;
  hideRefreshControl?: boolean;
  objectValue: string;
  subTitle?: string;
  taskName: string;
  title: string;
  upText?: string;
  value: string;
  viewOptions: ViewOption[];
  withDateFilter?: boolean;
  withFilterSection?: boolean;
  withSummarySection?: EntityDetailsSectionProps;
}
