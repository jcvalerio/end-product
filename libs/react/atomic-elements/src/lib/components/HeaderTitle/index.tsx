import { DisplayValueTitle } from '../display-value-title';
import { FormatProps } from '@kleeen/types';
import React from 'react';
import classnames from 'classnames';
import { isNilOrEmpty } from '@kleeen/common/utils';

const bem = 'ks-header-title';

interface HeaderTitleProps {
  displayValue?: string;
  format?: FormatProps;
  formatType?: string;
  subTitle?: string;
  title?: string;
}

export const HeaderTitleEllipsis = (props: HeaderTitleProps, split = true): React.ReactElement => {
  return (
    <>
      {props.displayValue && isNilOrEmpty(props.subTitle) ? (
        <div className={classnames(bem, 'header-title')}>
          <div className={classnames(`${bem}__title`, 'title-container')}>{props.title}</div>
          <div className={classnames(`${bem}__ellipsis`, 'with-ellipsis')}>
            <DisplayValueTitle {...props} />
          </div>
        </div>
      ) : (
        props.title
      )}
    </>
  );
};

export const HeaderTitle = (props: HeaderTitleProps, split = true): React.ReactElement => {
  return (
    <>
      {props.displayValue && isNilOrEmpty(props.subTitle) ? (
        <>
          <DisplayValueTitle {...props} />
          {split && ' | ' + props.title}
        </>
      ) : (
        props.title
      )}
    </>
  );
};
