import './ButtonSubHeader.scss';

import * as Icons from '@material-ui/icons';

import { ButtonHeaderProps, IconDynamicProps } from './ButtonSubHeader.model';
import { KsButton, KsIcon } from '@kleeen/react/components';

import { Badge } from '@material-ui/core';
import { ButtonSubHeaderEnum } from './ButtonSubHeader.enum';
import ClassNames from 'classnames';
import React from 'react';
import { isNil } from 'ramda';

export const IconDynamic = ({ icon }: IconDynamicProps): React.ReactElement => {
  const CompIcon: Icons.SvgIconComponent = Icons[icon];
  return CompIcon ? <CompIcon /> : <KsIcon icon={icon} />;
};

export const ButtonSubHeader = ({
  name,
  icon,
  subName,
  className,
  countElement = 0,
  setIsShow,
  isShow,
  translate,
  isDisabled = false,
  isOnClick = true,
  ...props
}: ButtonHeaderProps): React.ReactElement => {
  const [idElement] = React.useState<string>(String(Date.now()));

  React.useEffect(() => {
    function handleClickOutside(e) {
      const element = e?.path;
      if (element[2]?.id === idElement || !element) return null;
      if (
        element[0].classList.contains(ButtonSubHeaderEnum.elementButtonGenericHeader) ||
        element[0].tagName === ButtonSubHeaderEnum.body
      ) {
        if (typeof setIsShow === 'function') {
          setIsShow(false);
        }
      }
    }

    if (!isNil(isShow) && !isNil(setIsShow)) {
      if (isShow) {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }
    }
  }, [isShow]);

  return (
    <KsButton
      id={idElement}
      className={ClassNames(`${className} element-button-generic`, { 'element-button-active': isShow })}
      disabled={isDisabled}
      onClick={() => setIsShow && isOnClick && setIsShow(!isShow)}
    >
      <Badge badgeContent={countElement} color="error">
        {icon && (
          <div className="avatar">
            <IconDynamic icon={icon} />
          </div>
        )}
        {name && (
          <div className="container_">
            <p>{subName}</p>
            <h3 className={ClassNames({ 'simple-title': !subName })}>{name}</h3>
          </div>
        )}
        {props.children}
      </Badge>
      {!isNil(isShow) && <div className={ButtonSubHeaderEnum.elementButtonGenericHeader}></div>}
    </KsButton>
  );
};
