import './ArrowPoint.scss';

import { ArrowPointProps, ResultProps } from './ArrowPoint.model';

import MuiTooltip from '@material-ui/core/Tooltip';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React from 'react';
import classNames from 'classnames';

const ArrowDrop = ({ highlighted, result }: ResultProps): React.ReactElement => {
  if (result < 0) {
    return <PlayArrowIcon className={classNames('arrow-down', { highlighted })} viewBox="8.5 5 11 14" />;
  } else if (result > 0) {
    return <PlayArrowIcon className={classNames('arrow-up', { highlighted })} viewBox="8 5 11 14" />;
  }

  return <PlayArrowIcon className={classNames('arrow-neutral', { highlighted })}></PlayArrowIcon>;
};

export const ArrowPoint = ({
  changeDirections,
  className = '',
  highlighted,
  result,
  showPercentage,
}: ArrowPointProps): React.ReactElement => {
  const value = `${Math.abs(result)}${showPercentage ? '%' : ''}`;
  return (
    <div
      className={classNames('container-arrow-point', { changeDirections }, { className }, { highlighted })}
    >
      <ArrowDrop highlighted={highlighted} result={result} />
      <MuiTooltip enterDelay={500} enterNextDelay={500} title={value} placement="top-start">
        <div className={classNames({ 'text-highlighted': highlighted })}>{value}</div>
      </MuiTooltip>
    </div>
  );
};
