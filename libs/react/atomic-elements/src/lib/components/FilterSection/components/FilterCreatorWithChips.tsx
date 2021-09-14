import './styles/FilterCreatorWithChips.scss';

import { Chip, IconButton } from '@material-ui/core';
import { FilterOperators, TimestampKey, Translate } from '@kleeen/types';
import {
  FilterOption,
  FilterSectionEnum,
  FiltersAddedState,
  addFilterText,
  materialAutocompleteClearSignal,
  optionsByStatisticalType,
} from '../FilterSection.model';
import React, { ReactElement, useEffect, useState } from 'react';

import { ChipsGroupByCategoryProps } from './FilterCreatorWithChips.model';
import CloseIcon from '@material-ui/icons/Close';
import FilterAutocomplete from '../../FilterAutocomplete/FilterAutocomplete';
import MuiTooltip from '@material-ui/core/Tooltip';
import camelcase from 'lodash.camelcase';
import classnames from 'classnames';
import moment from 'moment';
import { useStyles } from './styles/FilterCreatorWithChips.style';

const bem = 'ks-filter-creator-with-chips';

const ChipsGroupByCategory = ({
  filters,
  getTagProps,
  removeCategory,
  removeValue,
  translate,
}: ChipsGroupByCategoryProps & { translate: Translate }): React.ReactElement => {
  const classes = useStyles();

  return (
    <>
      {Object.entries(filters).map(([key, values], i) => {
        const keyFormatted = camelcase(key);
        const translationOption = `entities.${keyFormatted}.${keyFormatted}`;
        const optionTranslated = translate(translationOption);
        return (
          <div className={classnames(bem)} key={key}>
            <div>
              <div className={classnames(`${bem}__title`, classes.categoryTitle)}>
                {optionTranslated !== translationOption ? optionTranslated : key}
              </div>
              <div className={classnames(`${bem}__content`, classes.categoryContent)}>
                {(values._in || []).map((option: string, index) => {
                  const auxKey = option.toString().split(TimestampKey.key);
                  const auxLabel =
                    auxKey.length > 1 ? moment(Number(auxKey[1])).format(TimestampKey.format) : auxKey[0];
                  return (
                    <MuiTooltip title={auxLabel} key={`${key}-${auxLabel}`}>
                      <Chip
                        {...getTagProps({ index })}
                        size="small"
                        label={auxLabel}
                        onDelete={() => {
                          removeValue(key, option, FilterOperators.in);
                        }}
                        deleteIcon={
                          <IconButton>
                            <CloseIcon />
                          </IconButton>
                        }
                      />
                    </MuiTooltip>
                  );
                })}
                {values.max && (
                  <Chip
                    size="small"
                    label={`Max is ${values.max}`}
                    onDelete={() => {
                      removeValue(key, values.max, FilterOperators.max);
                    }}
                    deleteIcon={
                      <IconButton>
                        <CloseIcon />
                      </IconButton>
                    }
                  />
                )}
                {values.min && (
                  <Chip
                    size="small"
                    label={`Min is ${values.min}`}
                    onDelete={() => {
                      removeValue(key, values.min, FilterOperators.min);
                    }}
                    deleteIcon={
                      <IconButton>
                        <CloseIcon />
                      </IconButton>
                    }
                  />
                )}
                <MuiTooltip title="remove category">
                  <span>
                    <IconButton
                      aria-label="delete"
                      className={classnames(`${bem}__cta--delete`, classes.categorybutton)}
                      disabled={false}
                      onClick={() => removeCategory(key)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </span>
                </MuiTooltip>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

let lastCategorySelected;

const FilterCreatorWithChips = ({
  categoryFilterOptions,
  filterOptionsByCategory,
  addFilter,
  setIsApplyDisabled,
  filtersAdded,
  removeValue,
  removeCategory,
  translate,
}: {
  categoryFilterOptions: FilterOption[];
  filterOptionsByCategory: Record<string, FilterOption[]>;
  addFilter: (category: string, operator: FilterOperators, value: string | number) => void;
  setIsApplyDisabled: (value: boolean) => void;
  filtersAdded: FiltersAddedState;
  translate: Translate;
  removeValue;
  removeCategory;
}): ReactElement => {
  const [label, setLabel] = useState(addFilterText);
  const [value, setValue] = useState(filtersAdded.length ? [] : [{}]);
  const [inputValue, setInputValue] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [isCategory, setIsCategory] = useState(true);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const isSelectingCategory = !currentCategory;
    if (isSelectingCategory) {
      // validation when the category have all the values added should not appear?
      setOptions(categoryFilterOptions);
    }
  }, [currentCategory]);

  const handleCategoryClick = (all: FilterOption[]): void => {
    const { name, statisticalType = '' } = all[all.length - 1];
    setIsCategory(!isCategory);
    setCurrentCategory(name);
    setLabel(name);
    lastCategorySelected = name;

    const { options: filterOptionsByType } = optionsByStatisticalType.find(({ included }) =>
      included.includes(statisticalType),
    ) || { options: [] };
    let auxOptionsByCategory = filterOptionsByCategory[name];
    if (statisticalType === 'Data - Numeric - Temporal') {
      auxOptionsByCategory = filterOptionsByCategory[name]?.map((option) => {
        return {
          ...option,
          name: moment(option.name).format(TimestampKey.format),
          value: option.name,
        };
      });
    }
    setOptions([...filterOptionsByType, ...auxOptionsByCategory]);
  };

  const handleValueClick = (all: FilterOption[]): void => {
    const { name, operator, section, value: valueTimestamp } = all[all.length - 1];
    setLabel(addFilterText);
    setIsCategory(!isCategory);
    // TODO close modal on this clicks
    if (section === FilterSectionEnum.Bounds) {
      addFilter(currentCategory, operator, inputValue);
    } else if (name) {
      // * We use the timestamp key to know that the value in the query string is timestamp type
      const auxName = valueTimestamp ? `${TimestampKey.key}${valueTimestamp}` : name;
      addFilter(currentCategory, FilterOperators.in, auxName);
    }
    setOptions(categoryFilterOptions);
    setCurrentCategory('');
  };

  const getOptionLabel = ({ name, section }: FilterOption): string => {
    if (section === FilterSectionEnum.Bounds) {
      return !inputValue ? name : `${name} is ${inputValue}`;
    }
    return Number.isInteger(name) ? String(name) : name || '';
  };

  const getOptionDisabled = ({ section }: FilterOption): boolean =>
    section === FilterSectionEnum.Bounds && isNaN(parseInt(inputValue));

  const getOptions = (currentOptions: FilterOption[]): FilterOption[] => {
    if (!currentCategory || !filtersAdded[currentCategory]) return options;
    return currentOptions.filter(
      (option) => !filtersAdded[currentCategory][FilterOperators.in]?.includes(option.name),
    );
  };

  return (
    <FilterAutocomplete
      multiple
      disableCloseOnSelect={!currentCategory}
      disableClearable
      withoutMenuTransform
      getOptionLabel={getOptionLabel}
      getOptionDisabled={getOptionDisabled}
      inputValue={inputValue}
      value={value}
      filterOptions={(filterOptions, state) => {
        const filteredOptions = filterOptions.filter(({ name, section }) => {
          if (section === FilterSectionEnum.Bounds) return true;
          return String(name).toLowerCase()?.includes(state.inputValue?.toLowerCase());
        });

        return filteredOptions;
      }}
      renderTags={(tagValue, getTagProps) => {
        return (
          <ChipsGroupByCategory
            filters={filtersAdded}
            getTagProps={getTagProps}
            removeValue={removeValue}
            removeCategory={removeCategory}
            translate={translate}
          />
        );
      }}
      onInputChange={(e, changeValue, type) => {
        if (type === materialAutocompleteClearSignal) {
          setValue([]);
          setCurrentCategory('');
          setIsCategory(true);
          setLabel(addFilterText);
        }
        setInputValue(changeValue);
      }}
      onChange={(_, optionsChange: FilterOption[], reason) => {
        if (reason === 'remove-option') return;
        setInputValue('');
        const isSelectingCategory = !currentCategory && optionsChange;
        if (!optionsChange) return;

        const latestAdded = optionsChange[optionsChange.length - 1];

        if (isSelectingCategory) {
          handleCategoryClick(optionsChange);
        } else {
          optionsChange[optionsChange.length - 1] = { ...latestAdded, category: lastCategorySelected };
          setValue(optionsChange);

          handleValueClick(optionsChange);
        }
      }}
      options={getOptions(options)}
      groupBy={({ section }) => section}
      noHelperText={true}
      placeholder={translate('app.subHeader.filterSection.addFilters')}
    />
  );
};

export default FilterCreatorWithChips;
