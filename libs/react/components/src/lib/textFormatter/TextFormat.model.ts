import { Cell, FormatProps } from '@kleeen/types';
import { ReactNode } from 'react';

export interface RestrictionProps {
  [key: string]: boolean;
}
export interface TextFormatterProps {
  textAlignment?: 'center' | 'left' | 'flex-end';
  children: ReactNode;
  format: FormatProps;
  transformation?: string;
  formatType?: string;
  hasDisplayMedia?: boolean;
  cell?: Cell | Cell[];
}
