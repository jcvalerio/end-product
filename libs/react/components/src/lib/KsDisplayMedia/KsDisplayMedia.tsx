import React, { ReactElement } from 'react';

import { DisplayMediaType } from '@kleeen/types';
import { KsDisplayMediaProps } from './KsDisplayMedia.model';
import UserAvatar from 'react-user-avatar';
import { useStyles } from './KsDisplayMedia.styles';
import SVG from 'react-inlinesvg';

export const KsDisplayMedia = ({ value, type, size, color, ...props }: KsDisplayMediaProps) => {
  const classes = useStyles();
  const classType = `${props.className} ${classes[type]} ${type}`;
  const splitedArray = value ? value.split(' ') : [' '];
  const finalValue =
    splitedArray.length === 1
      ? splitedArray[0].substring(0, 2)
      : `${splitedArray[0]} ${splitedArray[1]}`.toUpperCase();
  switch (type) {
    case DisplayMediaType.Text:
      return (
        <UserAvatar size={size} name={finalValue} className={classType} color={'var(--secondary-color)'} />
      );
    case DisplayMediaType.Src:
      return (
        <UserAvatar
          size={size}
          name={finalValue}
          src={value}
          className={classType}
          color={'var(--transparent)'}
        />
      );
    case DisplayMediaType.Flag:
      return (
        <UserAvatar
          size={size}
          name={finalValue}
          src={value}
          className={classType}
          borderRadius={0}
          color={'var(--transparent)'}
        />
      );
    case DisplayMediaType.Svg:
      return (
        <div className={classes[type]}>
          <SVG
            className={classes[type]}
            style={{ color, height: `${size}px`, width: `${size}px` }}
            src={value}
          />
        </div>
      );
    case DisplayMediaType.Emoji:
      return <UserAvatar size={size} name={finalValue} className={classType} color={'var(--transparent)'} />;
    default:
      return <UserAvatar size={size} name={finalValue} className={classType} color={'var(--transparent)'} />;
  }
};

export default KsDisplayMedia;
