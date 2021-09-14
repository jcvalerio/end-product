import React from 'react';

import './ksGrid.scss';

const GRID_DEFAULT_VALUES = {
  COLUMN_WIDTH: '233px',
  GUTTER: '35px',
  ROW_HEIGHT: 'auto',
};

const KsGrid = ({
  type = 'grid',
  columnWidth = GRID_DEFAULT_VALUES.COLUMN_WIDTH,
  gutter = GRID_DEFAULT_VALUES.GUTTER,
  rowHeight = GRID_DEFAULT_VALUES.ROW_HEIGHT,
  children,
}) => {
  return (
    <div
      className={`kui-grid ${type}`}
      style={{
        gridAutoRows: rowHeight,
        gridGap: gutter,
        gridTemplateColumns: '1fr 1fr',
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </div>
  );
};

export default KsGrid;
