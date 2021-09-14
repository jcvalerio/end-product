import { CustomWidgetContainerProps, CustomWidgetProps } from '@kleeen/types';
import { ReactElement, Suspense, lazy } from 'react';

import { Loader } from '@kleeen/react/components';
import { useStyles } from './custom-widget.styles';

export function CustomWidgetContainer({ widget, ...props }: CustomWidgetContainerProps): ReactElement {
  const classes = useStyles();

  const customWidgetProps: CustomWidgetProps = {
    ...props,
    className: classes.container,
    key: widget.id,
    title: widget.title,
    widget,
  };

  const CustomWidget = lazy(() => {
    return import(`../../../../../../../../apps/cloud/src/app/modules/custom/${widget?.component}`);
  });

  return (
    <Suspense fallback={<Loader />}>
      <CustomWidget {...customWidgetProps} />
    </Suspense>
  );
}

export default CustomWidgetContainer;
