import './FooterNavLeft.scss';

import { Button, UserAccountButton } from '../NavLeft.style';
import { executeFunc, validateOpenInNewTab } from '../../../utils/navigationUtils';

import { useTheme, useUserInfo } from '@kleeen/react/hooks';

import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AppBar from '@material-ui/core/AppBar';
import { FooterNavLeftProps } from './FooterNavLeft.model';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { KsSvgIcon } from '@kleeen/react/components';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import classnames from 'classnames';
import { styled } from '@material-ui/core';
import { useStyles } from './FooterNavLeft.style';

const bem = 'ks-nav-left-footer';

const AppBarFooter = styled(AppBar)({});

export const FooterNavLeft = ({ helpUrl, accountMenuList, navigate }: FooterNavLeftProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { userInfo } = useUserInfo();
  const classes = useStyles();
  const { themeClass } = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const getUserEmail = (userObj): string => {
    return userObj ? userObj.attributes.email : '';
  };

  return (
    <div className={classnames(bem, classes.appBarContainer, 'nav-bar-footer')}>
      <AppBarFooter
        position="fixed"
        color="primary"
        className={classnames(`${bem}__app-bar`, classes.appBar)}
      >
        <div className={classnames(`${bem}__content`, classes.appBarContent)}>
          <UserAccountButton onClick={handleClick}>
            <AccountCircleOutlinedIcon />
            <Tooltip title={getUserEmail(userInfo)}>
              <div className={classnames(`${bem}__account--username`, classes.userName)}>
                <div className={classnames(`${bem}__account--user-info`, classes.userNameContent)}>
                  {getUserEmail(userInfo)}
                </div>
              </div>
            </Tooltip>
          </UserAccountButton>
          {Boolean(helpUrl) && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                window.open(helpUrl, '_blank');
              }}
            >
              <HelpOutlineOutlinedIcon />
            </Button>
          )}
          <Menu
            anchorEl={anchorEl}
            id="simple-menu"
            keepMounted
            MenuListProps={{ className: `${themeClass}` }}
            onClose={handleClose}
            open={Boolean(anchorEl)}
          >
            {accountMenuList.map(({ func, icon, path, title }) => (
              <MenuItem
                key={title}
                className={classnames(`${bem}__menu--item`)}
                onClick={(e) => {
                  executeFunc(func);
                  validateOpenInNewTab(navigate, path, e);
                  handleClose();
                }}
              >
                <KsSvgIcon icon={icon} />
                {title}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </AppBarFooter>
    </div>
  );
};
