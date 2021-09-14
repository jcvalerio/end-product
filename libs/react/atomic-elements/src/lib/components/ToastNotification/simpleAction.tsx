import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { KsMenuItem } from '@kleeen/react/components';

export interface SimpleActionProps {
  title: string;
  onClick: () => void;
}

const useActionContainerClass = makeStyles({
  actionContainer: {
    display: 'flex',
    color: 'var(--on-surface-color)',
  },
});

export const SimpleAction = ({ onClick, title }: SimpleActionProps): ReactElement => {
  const classes = useActionContainerClass();

  return (
    <div className={classes.actionContainer}>
      <KsMenuItem key={title} className="menu-item" onClick={onClick}>
        {title}
      </KsMenuItem>
    </div>
  );
};
