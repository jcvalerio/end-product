import './SubHeader.scss';

import React from 'react';
import { SubHeaderProps } from './SubHeader.model';
import { useStyles } from '../Header/Header.style';

export * from './component/index';
export const SubHeader = ({ ...props }: SubHeaderProps): React.ReactElement => {
  const [element, setElement] = React.useState<HTMLDivElement>();
  const classes = useStyles(props);

  React.useEffect(() => {
    if (element?.parentElement?.firstElementChild) {
      const firstElementChild = element.parentElement.firstElementChild;
      firstElementChild['style'].borderRadius = 'var(--card-border-radius) var(--card-border-radius) 0 0';
    }
  }, [element]);

  return (
    <div
      ref={(el) => el && setElement(el)}
      className={`element-sub-header dataview ${classes.header}`}
      id={'sub-header-element-id'}
    >
      {props.children}
    </div>
  );
};
