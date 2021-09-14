import React from 'react';

export function useAnchorElement(): {
  anchorEl: null | HTMLElement;
  handleClick: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  handleClose: () => void;
} {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return { anchorEl, handleClick, handleClose };
}
