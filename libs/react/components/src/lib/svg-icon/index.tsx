import './svg-icon.styles.scss';

import { KsSvgIconProps, KsSvgIconSize } from './svg-icon.model';
import React from 'react';
import { IconRegistryConsumer } from '@kleeen/core-react';
import SVG from 'react-inlinesvg';
import classnames from 'classnames';

export function KsSvgIcon({ className, icon, size = KsSvgIconSize.Medium, style }: KsSvgIconProps) {
  return (
    <IconRegistryConsumer>
      {({ getIcon }) => (
        <SVG style={style} className={classnames('ks-svg-icon', className, size)} src={getIcon(icon).path} />
      )}
    </IconRegistryConsumer>
  );
}

export { KsSvgIconSize };
