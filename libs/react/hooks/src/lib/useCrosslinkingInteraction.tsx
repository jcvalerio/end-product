import React, { createContext, useContext } from 'react';

import { crosslinkingInteractionType } from '@kleeen/types';

export const CrosslinkingInteractionContext = createContext({
  crosslinkingInteraction: crosslinkingInteractionType.contextMenu,
});

export function useCrosslinkingInteraction() {
  const crosslinkingInteractionContext = useContext(CrosslinkingInteractionContext);
  return crosslinkingInteractionContext;
}

export const CrosslinkingInteractionProvider = ({ children, crosslinkingInteraction }) => {
  const crosslinkingInteractionValue = {
    crosslinkingInteraction,
  };
  return (
    <CrosslinkingInteractionContext.Provider value={crosslinkingInteractionValue}>
      {children}
    </CrosslinkingInteractionContext.Provider>
  );
};
