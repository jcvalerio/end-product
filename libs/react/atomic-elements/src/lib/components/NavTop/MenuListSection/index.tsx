import { AccessControl, Translate } from '@kleeen/core-react';
import {
  ConfirmationActionDialog,
  KsMenuContainer,
  KsMenuItem,
  KsSvgIcon,
  KsSvgIconSize,
} from '@kleeen/react/components';
import React, { ReactElement, useState } from 'react';
import { executeFunc, validateOpenInNewTab } from '../../../utils/navigationUtils';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuList from '@material-ui/core/MenuList';
import { MenuListSectionProps } from './MenuListSelection.model';
import MuiPopper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import { roleAccessKeyTag } from '@kleeen/common/utils';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  popper: {
    backdropFilter: 'blur(4px)',
  },
});

interface optionNavigation {
  title: string;
  type: string;
  func: any;
  path: string;
  openInNewTab: boolean;
}

const MenuListSection = ({
  anchorEl,
  className,
  handleClose,
  menuList,
  open,
  productName,
  navigate,
  setOpen,
}: MenuListSectionProps): ReactElement => {
  const classes = useStyles();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [currentNavigation, setCurrentNavigation] = useState<optionNavigation>();
  const history = useHistory();

  function onClose(): void {
    setIsConfirmationOpen(false);
  }

  function openAnNewTab(func: any, path: string, openInNewTab: boolean, type: string, e?: any): void {
    executeFunc(func);
    validateOpenInNewTab(navigate, path, e, type, history, openInNewTab);
    setOpen(false);
  }

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <MuiPopper className={classes.popper} open={open} anchorEl={anchorEl} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <KsMenuContainer className={className} variant="outlined" square>
              <MenuList data-testid="ks-dropdown-menu">
                {menuList?.map(({ title, path, func, icon, type, areYouSure, openInNewTab }) => (
                  <AccessControl
                    id={roleAccessKeyTag(`navigation.${title}`)}
                    key={roleAccessKeyTag(`navigation.${title}`)}
                  >
                    <KsMenuItem
                      key={path}
                      className="menu-item"
                      onClick={(e) => {
                        if (areYouSure) {
                          setCurrentNavigation({ title, func, path, openInNewTab, type });

                          setIsConfirmationOpen(true);
                        } else {
                          openAnNewTab(func, path, openInNewTab, type, e);
                        }
                      }}
                    >
                      {icon && (
                        <KsSvgIcon size={KsSvgIconSize.Medium} className="nav-menu-icons" icon={icon} />
                      )}
                      {title}
                    </KsMenuItem>
                  </AccessControl>
                ))}
                {currentNavigation && (
                  <ConfirmationActionDialog
                    description={
                      <Translate id="app.navigation.modal.description" type="html" values={{ productName }} />
                    }
                    key={`go-out-confirmation`}
                    open={isConfirmationOpen}
                    onAction={() => {
                      openAnNewTab(
                        currentNavigation.func,
                        currentNavigation.path,
                        currentNavigation.openInNewTab,
                        currentNavigation.type,
                      );
                    }}
                    onClose={onClose}
                    title={
                      <Translate
                        id="app.navigation.modal.title"
                        type="html"
                        values={{ title: currentNavigation.title }}
                      />
                    }
                  />
                )}
              </MenuList>
            </KsMenuContainer>
          </Grow>
        )}
      </MuiPopper>
    </ClickAwayListener>
  );
};

export default MenuListSection;
