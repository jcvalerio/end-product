import React, { ReactElement } from 'react';
import { CircularProgressProps } from './circularProgress.model';
import { useStyles } from './circularProgress.style';

export const CircularProgress = ({
  children,
  radius,
  stroke,
  progress,
}: CircularProgressProps): ReactElement => {
  const classes = useStyles();
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={classes.circularProgress}
      style={{ height: `${normalizedRadius * 2 + stroke}px`, width: `${normalizedRadius * 2 + stroke}px` }}
    >
      <svg
        className={classes.progressContainer}
        height={normalizedRadius * 2 + stroke}
        width={normalizedRadius * 2 + stroke}
      >
        <circle
          stroke="var(--on-surface-color)"
          fill="transparent"
          strokeWidth={1}
          r={normalizedRadius - stroke / 2 + 1}
          cx={normalizedRadius + stroke / 2}
          cy={normalizedRadius + stroke / 2}
        />
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'all 1s linear' }}
          r={normalizedRadius}
          cx={normalizedRadius + stroke / 2}
          cy={normalizedRadius + stroke / 2}
        />
      </svg>
      {children && <div className={classes.childrenContainer}>{children}</div>}
    </div>
  );
};
