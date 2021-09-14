import React, { createContext, useContext } from 'react';

export const SwishContext = createContext(null);

export function useSwish() {
  const swishContext = useContext(SwishContext);
  if (!swishContext) {
    throw new Error(`Swish inner components cannot be rendered outside the Swish layout component`);
  }
  return swishContext;
}

export const SwishLayoutProvider = ({
  children,
  fns: { toggleSwish, toggleLeft, toggleRight, showLeft, showRight },
}) => {
  const swishLayout = {
    toggleSwish,
    toggleLeft,
    toggleRight,
    showLeft,
    showRight,
  };
  return <SwishContext.Provider value={swishLayout}>{children}</SwishContext.Provider>;
};
