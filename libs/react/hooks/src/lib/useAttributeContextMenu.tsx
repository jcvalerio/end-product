import React, { useContext, useEffect, useState } from 'react';

import { DataPoint } from '@kleeen/types';

interface MenuContextContext {
  e?: any;
  dataPoints: DataPoint[];
  widgetId?: string;
}

interface MenuContextProvider {
  contextualToggle: boolean;
  context: MenuContextContext;
  openMenu: (props: MenuContextContext) => void;
  setContextualToggle: (isOpen: boolean) => void;
}

const MenuContext = React.createContext<MenuContextProvider>({
  contextualToggle: false,
  context: {
    dataPoints: [],
  },
  openMenu: (props) => props,
  setContextualToggle: (isOpen) => isOpen,
});

const useAttributeContextMenu = () => {
  const menuContext = useContext(MenuContext);

  return menuContext;
};

const AttributeContextMenuProvider = ({ children }) => {
  const [contextualToggle, setContextualToggle] = useState(false);
  const [context, setContext] = useState<MenuContextContext>({
    dataPoints: [],
  });

  useEffect(() => {
    if (!contextualToggle) {
      setContext({
        dataPoints: [],
      });
    }
  }, [contextualToggle]);

  return (
    <MenuContext.Provider
      value={{
        openMenu: ({ e, ...props }) => {
          setContextualToggle(true);

          if (context) {
            setContext({
              e,
              ...props,
            });
          }
        },
        setContextualToggle,
        contextualToggle,
        context,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export { AttributeContextMenuProvider };
export default useAttributeContextMenu;
