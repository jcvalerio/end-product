import { Attribute, ElementComponents, RegisterEvents } from '@kleeen/types';

export interface InputElementProps {
  attributes: Attribute[];
  elements: ElementComponents;
  params: any; // TODO: @cafe add types here
  registerEvents: RegisterEvents;
  taskName: string;
  widgetId: string;
}
