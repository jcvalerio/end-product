import { ReactElement } from './react';

export type AppModule = {
  component: ReactElement;
  path: string;
  priority: number;
};
