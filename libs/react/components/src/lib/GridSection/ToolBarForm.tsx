import './ToolBarForm.scss';

import React, { useState } from 'react';

import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Localization } from './GridSection.model';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
interface ToolBarFormProps {
  localization: Localization;
  handleChange: Function;
  widgetId: string;
}

const SearchContainer = (props: ToolBarFormProps) => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const {
    localization: { searchTooltip, clearSearchAriaLabel, searchPlaceholder },
    handleChange,
  } = props;
  return (
    <TextField
      placeholder={searchPlaceholder}
      value={searchInputValue}
      onChange={(e) => {
        const { value } = e.target;
        setSearchInputValue(value);
        handleChange('all', value);
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Tooltip title={searchTooltip} onClick={() => setSearchInputValue('')}>
              <SearchIcon fontSize="small" />
            </Tooltip>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setSearchInputValue('');
                handleChange('all', '');
              }}
              aria-label={clearSearchAriaLabel}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
const ToolBarForm = (props: ToolBarFormProps) => {
  const {
    localization = {
      searchPlaceholder: '',
      searchTooltip: '',
      clearSearchAriaLabel: '',
      addButtonAriaLabel: '',
      actionsTableHeaderRow: '',
      editButtonAriaLabel: '',
      deleteButtonAriaLabel: '',
      confirmArialLabel: '',
      rejectAriaLabel: '',
      confirmDeleteLabel: '',
    },
    widgetId,
    handleChange,
  } = props;
  return (
    <Toolbar id={`search-form-container_${widgetId}`} className="search-form-container">
      <SearchContainer handleChange={handleChange} localization={localization} widgetId={widgetId} />
    </Toolbar>
  );
};

export default ToolBarForm;
