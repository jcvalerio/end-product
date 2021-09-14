import { CardSectionLayout, OnInputChangeEvent, RegisterEvents, Widget } from '@kleeen/types';

import { ReactNode } from 'react';

interface CardWidgetProps {
  children: ReactNode;
  disabled?: boolean;
  disableHeightCalculation?: boolean;
  hideTitle?: boolean;
  icon: boolean;
  selectedViz?: number;
  title: string | JSX.Element;
  widgetSelector?: null | JSX.Element;
}

interface CardTitleProps {
  icon: boolean;
  title: string | JSX.Element | null | undefined;
}

type GridJustification =
  | 'center'
  | 'flex-end'
  | 'flex-start'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

interface CardSectionProps {
  cardSectionLayout?: CardSectionLayout;
  children?: ReactNode;
  containerId?: string;
  fullWidth?: boolean;
  hideSaveAndClose?: boolean;
  hideTOC?: boolean;
  justifyContent?: GridJustification;
  onInputChange?: OnInputChangeEvent;
  registerEvents?: RegisterEvents;
  skipAccessControlCheck?: boolean;
  taskName?: string;
  widgets?: Widget[];
}

interface RenderChildrenProps {
  cardSectionLayout?: CardSectionLayout;
  children?: ReactNode;
  hideSaveAndClose?: boolean;
  onInputChange?: OnInputChangeEvent;
  registerEvents?: RegisterEvents;
  taskName: string;
  widgets?: Widget[];
  widgetsRefs?: any;
}

interface RenderWidgetProps {
  disableHeightCalculation?: boolean;
  hideSaveAndClose?: boolean;
  onInputChange?: OnInputChangeEvent;
  preferredWidget: string;
  registerEvents?: RegisterEvents;
  taskName: string;
  widget: Widget;
}

export {
  CardSectionLayout,
  CardSectionProps,
  CardTitleProps,
  CardWidgetProps,
  RenderChildrenProps,
  RenderWidgetProps,
};
