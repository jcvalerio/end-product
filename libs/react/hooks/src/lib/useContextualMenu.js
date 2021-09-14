import React, { useContext, useState } from 'react';

const MenuContext = React.createContext({
  contextualToggle: false,
  context: {
    position: { x: 0, y: 0 },
    entityName: '',
    menuOptions: [],
  },
  openMenu: () => {},
  setContextualToggle: () => {},
});

const useContextualMenu = () => {
  const menuContext = useContext(MenuContext);

  return menuContext;
};

const MenuContextProvider = ({ children }) => {
  const [contextualToggle, setContextualToggle] = useState(false);
  const [context, setContext] = useState({
    position: { x: 0, y: 0 },
    entityName: '',
    menuOptions: [],
  });

  return (
    <MenuContext.Provider
      value={{
        openMenu: ({ e, ...props }) => {
          setContextualToggle(true);

          if (context) {
            const clientRect = e.target.getBoundingClientRect();
            setContext({
              position: {
                y: clientRect.bottom,
                x: clientRect.left,
              },
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

export { MenuContextProvider };
export default useContextualMenu;
