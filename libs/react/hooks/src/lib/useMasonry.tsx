import React, { createContext, useContext } from 'react';

export const MasonryContext = createContext({ updateLayout: (contentHeight: number) => {} });

export function useMasonry() {
  const masonryContext = useContext(MasonryContext);
  return masonryContext;
}

export const MasonryProvider = ({ children, updateLayout }) => {
  const masonryLayout = {
    updateLayout,
  };
  return <MasonryContext.Provider value={masonryLayout}>{children}</MasonryContext.Provider>;
};