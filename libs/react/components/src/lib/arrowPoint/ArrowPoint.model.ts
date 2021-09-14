import { ChangeDirectionsProps } from '@kleeen/types';

export interface ArrowPointProps extends ChangeDirectionsProps, ResultProps {
  className?: string;
  highlighted?: boolean;
  showPercentage?: boolean;
}

export interface ResultProps {
  highlighted?: boolean;
  result: number;
}
