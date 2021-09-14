import React from 'react';

export enum KsSvgIconSize {
  /**
   * 10px
   */
  ExtraSmall = 'extra-small',
  /**
   * 13px
   */
  Small = 'small',
  /**
   * 16px
   */
  Medium = 'medium',
  /**
   * 21px
   */
  Large = 'large',
  /**
   * 26px
   */
  ExtraLarge = 'extra-large',
}

type KsSvgIconSizeProp = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | KsSvgIconSize;

export interface KsSvgIconProps {
  className?: string;
  icon: string;
  size?: KsSvgIconSizeProp;
  style?: React.CSSProperties;
}
