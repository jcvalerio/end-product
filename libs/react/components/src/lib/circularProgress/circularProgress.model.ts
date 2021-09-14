import { ReactNode } from 'react';

export interface CircularProgressProps {
  children?: ReactNode;
  radius: number;
  stroke: number;
  progress: number;
}
