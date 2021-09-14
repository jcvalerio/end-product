import { AccessControl, Translate } from '@kleeen/core-react';
import { ConfirmationActionDialog, KsSvgIcon } from '@kleeen/react/components';
import { FooterNavLeft } from './Footer/Index';
import { HeaderNavLeft } from './Header/Index';
import { NavProps } from '../../../types/types';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { executeFunc, validateOpenInNewTab } from '../../utils/navigationUtils';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import classnames from 'classnames';
import { roleAccessKeyTag } from '@kleeen/common/utils';
import { useNavigation } from '@kleeen/react/hooks';

const bem = 'ks-nav-left';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: 'var(--left-nav-bar-width)',
      flexShrink: 0,
      '& .MuiList-root': {
        '& .MuiTypography-root': {
          fontSize: 'var(--tx-M)',
          display: 'flex',
          alignItems: 'center',
        },
        '& .MuiListItem-root': {
          '& .MuiListItemText-root': {
            margin: '0px',
          },
          color: 'var(--on-nav-top-bg-color)',
          padding: 'var(--pm-S) var(--pm-2XL)',
          '&:hover': {
            color: 'var(--on-left-nav-bar-button-hover)',
            background: 'var(--left-nav-bar-button-hover)',
          },
          '&.active': {
            cursor: 'auto',
            color: 'var(--on-left-nav-bar-active-item-color)',
            background: 'var(--left-nav-bar-active-item-bg)',
            '& .MuiTypography-root': {
              fontWeight: '700',
            },
            borderLeft: 'solid var(--left-nav-bar-active-item-border-left) var(--on-application-background)',
          },
          '&:focus': {
            color: 'var(--on-left-nav-bar-active-item-color)',
            background: 'var(--left-nav-bar-active-item-bg)',
          },
          '& .ks-svg-icon': {
            marginRight: 'var(--pm-M)',
          },
        },
      },
      borderTopRightRadius: 'var(--left-nav-border-radius)',
      borderBottomRightRadius: 'var(--left-nav-border-radius)',
    },
    drawerPaper: {
      background: 'var(--nav-top-bg-color)',
      width: 'var(--left-nav-bar-width)',
      borderTopRightRadius: 'var(--card-border-radius)',
      borderBottomRightRadius: 'var(--card-border-radius)',
      border: 'none',
      boxShadow: 'var(--left-nav-bar-shadow)',
    },
    list: {
      marginTop: 'var(--pm-1XL)',
      overflowY: 'scroll',
      '&::-webkit-scrollbar': {
        width: '0px',
      },
    },
  }),
);
interface optionNavigation {
  title: string;
  type: string;
  func: any;
  path: string;
  openInNewTab: boolean;
}

export const NavLeft = ({
  accountMenuList,
  accountName,
  helpUrl,
  logo,
  menuList,
  productName,
}: NavProps): JSX.Element => {
  const location = useLocation();
  const classes = useStyles();
  const navigate = useNavigation();
  const history = useHistory();
  const [activePath, setActivePath] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [currentNavigation, setCurrentNavigation] = useState<optionNavigation>();

  useEffect(() => {
    if (location.pathname) {
      setActivePath(location.pathname);
    }
  }, [location]);

  const isActivePath = (path: string): string => path === activePath && 'active';

  function handleOnClose(): void {
    setIsConfirmationOpen(false);
  }

  function openAnNewTab(func: any, path: string, openInNewTab: boolean, type: string, e?: any): void {
    executeFunc(func);
    validateOpenInNewTab(navigate, path, e, type, history, openInNewTab);
    setActivePath(path);
  }

  return (
    <Drawer
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
      className={classnames(bem, classes.drawer)}
      variant="permanent"
    >
      <HeaderNavLeft logo={logo} accountName={accountName} productName={productName} />
      <List className={classnames(`${bem}__lists`, classes.list)}>
        {menuList.map(({ title, func, icon, path, type, areYouSure, openInNewTab }) => {
          const navigationTitle = roleAccessKeyTag(`navigation.${title}`);
          return (
            <AccessControl key={navigationTitle} id={navigationTitle}>
              <ListItem
                button
                key={title}
                className={classnames(`${bem}__lists-item`, isActivePath(path))}
                onClick={(e) => {
                  if (areYouSure) {
                    setIsConfirmationOpen(true);
                    setCurrentNavigation({ title, func, path, openInNewTab, type });
                  } else {
                    openAnNewTab(func, path, openInNewTab, type, e);
                  }
                }}
              >
                {icon && <KsSvgIcon icon={icon} />}
                <ListItemText primary={title} />
              </ListItem>
            </AccessControl>
          );
        })}

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
            onClose={handleOnClose}
            title={
              <Translate
                id="app.navigation.modal.title"
                type="html"
                values={{ title: currentNavigation.title }}
              />
            }
          />
        )}
      </List>
      <FooterNavLeft helpUrl={helpUrl} accountMenuList={accountMenuList} navigate={navigate} />
    </Drawer>
  );
};
