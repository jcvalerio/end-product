import { ReactElement, Suspense, lazy } from 'react';

import { Loader } from '@kleeen/react/components';
import classnames from 'classnames';
import { useStyles } from './custom-view.styles';

const bem = 'ks-custom-view';

// TODO: add props interface
export const CustomView = ({ widget }, ...props: any[]): ReactElement => {
  const classes = useStyles();

  const customWidgetProps = {
    ...props,
    className: classnames(bem, classes.divContainer),
    key: widget.id,
    title: widget.title,
  };

  const CustomWidget = lazy(() => {
    return import(`../../../../../../../apps/cloud/src/app/modules/custom/${widget?.component}`);
  });

  return (
    <Suspense fallback={<Loader />}>
      <CustomWidget {...customWidgetProps} />
    </Suspense>
  );
};

export default CustomView;
