import './ReadOnlyText.scss';

import React, { ReactElement } from 'react';

import { DataProps } from '../../../types';
import { Loader } from '@kleeen/react/components';
import { VisualizationWidgetProps } from '@kleeen/types';
import classnames from 'classnames';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { pathOr } from 'ramda';

const bem = 'ks-read-only-text';

interface ReadOnlyTextProps extends VisualizationWidgetProps {
  fullscreen?: boolean;
}

export function ReadOnlyText({ context, fullscreen }: ReadOnlyTextProps): ReactElement {
  const data: DataProps[] = context.data || [];
  const resultsByTransformation = isNilOrEmpty(data) ? [] : data;
  const result = pathOr('', [0, 'results'], resultsByTransformation);

  if (context.isLoading) {
    return <Loader />;
  }

  return <div className={classnames(bem, 'read-only-text', { fullscreen })}>{result}</div>;
}

export default React.memo(ReadOnlyText);
