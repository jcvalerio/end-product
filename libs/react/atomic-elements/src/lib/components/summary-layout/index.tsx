import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { useStyles } from './summary-layout.styles';
import { ErrorBoundaryComponent } from '@kleeen/react/components';

const defaultLayoutProps = {
  columnGap: 55,
  containerPadding: 68,
  keyValuePadding: 21,
  keyWidth: 144,
  valueWidth: 233,
};

// TODO: @cafe add types here
export function SummaryLayout({
  children,
  isFromButtonSummary = false,
  layoutProps = defaultLayoutProps,
  totalElements,
}) {
  // TODO: @cafe move this to an effect
  const columnWidth = layoutProps.keyWidth + layoutProps.valueWidth + layoutProps.columnGap / 2;

  const ref = useRef(null);
  const [width, setWidth] = useState(columnWidth);
  const [columnCount, setColumnCount] = useState(1);
  const [rowCount, setRowCount] = useState(totalElements || 1);
  const classes = useStyles({ ...layoutProps, columnCount, rowCount });

  useEffect(() => {
    // TODO @cafe if resizing becomes a performance issue, we could debounce here
    const handleResize = () => {
      const widthAvailableForContent = ref.current.offsetWidth - layoutProps.containerPadding;
      setWidth(ref.current ? widthAvailableForContent : columnWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref.current]);

  useEffect(() => {
    const columns = Math.floor(width / columnWidth) || 1;
    const rows = Math.ceil(totalElements / columns) || totalElements;

    setColumnCount(columns);
    setRowCount(rows);
  }, [totalElements, width]);

  return (
    <div
      className={classNames(
        'ks-summary-layout',
        isFromButtonSummary ? classes.summaryLayout : classes.summaryLayoutFromButtonSummary,
      )}
      ref={ref}
    >
      {/* TODO @cafe create a ticket to work on the title */}
      <ErrorBoundaryComponent>
        <div className={classNames('ks-summary-layout__content', classes.content)}>{children}</div>
      </ErrorBoundaryComponent>
    </div>
  );
}
