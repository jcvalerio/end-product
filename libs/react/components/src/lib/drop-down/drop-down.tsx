import { FormControl, Tooltip } from '@material-ui/core';
import { ItemType, KsDropDownProps, KsMenuProps } from './drop-down.model';
import { KsMenuContainer, KsMenuItem } from '../menu';
import { KsSvgIcon, KsSvgIconSize } from '../svg-icon';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { isNilOrEmpty, roleAccessKeyTag } from '@kleeen/common/utils';

import { AccessControl } from '@kleeen/core-react';
import Apps from '@material-ui/icons/Apps';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { KsButtonText } from '../button';
import MenuList from '@material-ui/core/MenuList';
import MuiPopper from '@material-ui/core/Popper';
import { useStyles } from './drop-down.style';

export function KsFloatMenu({
  anchorEl,
  className,
  handleClose,
  options,
  open,
  handleOnClick,
  accessKey = 'menu-item-key',
}: KsMenuProps): ReactElement {
  const classes = useStyles();

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
                {options?.map((item) => (
                  <AccessControl
                    id={roleAccessKeyTag(`${accessKey}.${item.key}`)}
                    key={roleAccessKeyTag(`${accessKey}.${item.key}`)}
                  >
                    <Tooltip title={item.label} placement="top">
                      <KsMenuItem
                        key={item.key || item.path}
                        onClick={(e) => {
                          if (item.handleOnClick) item.handleOnClick(e, item);
                          if (handleOnClick) handleOnClick(e, item);
                        }}
                      >
                        {item.icon && (
                          <KsSvgIcon
                            size={KsSvgIconSize.Medium}
                            className={classes.menuItemIcon}
                            icon={item.icon}
                          />
                        )}
                        <span className={classes.truncate}>{item.label}</span>
                      </KsMenuItem>
                    </Tooltip>
                  </AccessControl>
                ))}
              </MenuList>
            </KsMenuContainer>
          </Grow>
        )}
      </MuiPopper>
    </ClickAwayListener>
  );
}

export function KsDropDown({
  options,
  handleOnClick,
  selectedItem,
  InputElement,
  translate,
}: KsDropDownProps) {
  const anchorRef = useRef();
  const [open, setOpen] = useState(false);
  const defaultItem = options[0] || { label: 'No Options', key: 'non-options' };
  const [item, setItem] = useState(selectedItem || defaultItem);

  const classes = useStyles();

  useEffect(() => {
    if (selectedItem) {
      const newItem = options.find((option) => option.key === selectedItem.key) || defaultItem;

      setItem(newItem);
    }
  }, [defaultItem, selectedItem?.key]);

  useEffect(() => {
    if (!isNilOrEmpty(options)) {
      const [firstItem] = options;
      setItem(firstItem);
    }
  }, [options?.length]);

  const Icon = item.icon ? (
    <KsSvgIcon size={KsSvgIconSize.Large} className="menu-item-icon" icon={item.icon} />
  ) : (
    <Apps />
  );

  const DropDownButton = InputElement ? (
    <InputElement currentItem={item} setOpen={setOpen} ref={anchorRef} translate={translate} />
  ) : (
    <KsButtonText
      ref={anchorRef}
      onClick={() => setOpen(true)}
      size={'large'}
      startIcon={Icon}
      endIcon={<KeyboardArrowDownIcon />}
      className={classes.dropDownSize}
    >
      <Tooltip title={item.label} placement="top">
        <span className={classes.truncate}>{item.label}</span>
      </Tooltip>
    </KsButtonText>
  );

  return (
    <FormControl className={classes.formControl} data-testid="drop-down">
      {DropDownButton}
      {open && (
        <KsFloatMenu
          anchorEl={anchorRef.current}
          options={options}
          open={open}
          handleOnClick={(e, newItem) => {
            if (handleOnClick) handleOnClick(e, newItem);

            setOpen(false);
            setItem(newItem);
          }}
          handleClose={(e) => {
            setOpen(false);
          }}
        />
      )}
    </FormControl>
  );
}

export { KsButtonText };
