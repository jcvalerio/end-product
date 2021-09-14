import React, { ReactElement } from 'react';
import MuiChip, { ChipProps } from '@material-ui/core/Chip';
import { VizColor } from '@kleeen/types';

export function KsVizChip({
  vizColorNumber = 1,
  ...rest
}: ChipProps & { vizColorNumber?: VizColor }): ReactElement {
  const styles = {
    backgroundColor: `hsl(var(--viz${vizColorNumber}), 0.1)`,
    borderColor: `hsl(var(--viz${vizColorNumber}), 1)`,
    borderRadius: 'var(--pm-1XS)',
    borderStyle: 'solid',
    borderWidth: 'var(--pm-7XS)',
    color: `hsl(var(--viz${vizColorNumber}), 1)`,
    height: 'var(--wh-4XS)',
    fontSize: 'var(--tx-S)',
  };
  return <MuiChip style={styles} {...rest} />;
}
