import './FilterSection.scss';

import { KsButton as Button, KsIcon, KsIconButton } from '@kleeen/react/components';
import {
  Filter,
  FilterAccessLevels,
  FilterOption,
  FilterSectionEnum,
  FilterSectionProps,
  Params,
} from './FilterSection.model';
import { Paper, useStyles } from './FilterSection.styles';
import React, { ReactElement } from 'react';
import { useFilterContext, useFilters } from '@kleeen/react/hooks';

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { DatePickerInterval } from '../DatePickerInterval/index';
import FilterCreator from './components/FilterCreator';
import FilterTooltip from './components/FilterTooltip';
import FiltersComp from './components/FilterChipsAndCategories';
import Grid from '@material-ui/core/Grid';
import { KUIConnect } from '@kleeen/core-react';
import { Loader } from '@kleeen/react/components';
import MuiTypography from '@material-ui/core/Typography';
import { FilterOperators } from '@kleeen/types';
import { isSomeFilterUnavailable, cleanUnavailableFilters } from '@kleeen/frontend/utils';
import { isNilOrEmpty } from '@kleeen/common/utils';

const parseToFilterOptions = (options: string[], translate): FilterOption[] =>
  options.map((option) => ({
    name: option,
    section: translate ? translate('app.subHeader.filterSection.values') : FilterSectionEnum.Values,
    operator: FilterOperators.in,
  }));

const FilterSectionComponent = ({ translate, ...props }: FilterSectionProps): ReactElement => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const availableAttributesToFilter = props.filters ?? [];
  const excludedFilters = [FilterAccessLevels.Hide, FilterAccessLevels.Disabled];
  const categoryFilterOptions: FilterOption[] = availableAttributesToFilter
    .map(({ name, statisticalType, accessLevel }) => ({
      name,
      section: translate ? translate('app.subHeader.filterSection.filterBy') : FilterSectionEnum.FilterBy,
      statisticalType,
      accessLevel,
    }))
    .filter(({ accessLevel }) => !excludedFilters.includes(accessLevel as FilterAccessLevels));

  const params: Params = {
    baseModel: 'filters',
    attributes: availableAttributesToFilter.map(({ name }) => name).join(),
    operationName: 'filters',
  };
  const widgetData = useFilterContext({ taskName: props.taskName, widgetId: 'filters', params });
  const { results: filters }: Filter = (widgetData && widgetData.data) || {};
  const filterOptionsByCategory = filters
    ? filters.reduce(
        (acc, [filterName, options]) => ((acc[filterName] = parseToFilterOptions(options, translate)), acc),
        {},
      )
    : {};

  const handleDrawerOpen = (): void => {
    setOpen(true);
    props.onChangeFilterVisible && props.onChangeFilterVisible(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
    props.onChangeFilterVisible && props.onChangeFilterVisible(false);
  };

  const {
    handleFilter,
    removeValue,
    addFilter,
    removeCategory,
    queryParams,
    isApplyDisabled,
    filtersAdded,
    setIsApplyDisabled,
    datePickerState,
  } = useFilters(props.hasDateFilter);

  const shouldClearUnavailableFilters =
    !isNilOrEmpty(filtersAdded) &&
    !isNilOrEmpty(filterOptionsByCategory) &&
    isSomeFilterUnavailable(filtersAdded, filterOptionsByCategory);
  const filtersAvailable = shouldClearUnavailableFilters
    ? cleanUnavailableFilters(filtersAdded, filterOptionsByCategory)
    : filtersAdded;

  return (
    <>
      {open ? (
        <Paper elevation={3} className="filter-section">
          <div className="filter-container">
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <MuiTypography className="L2TitleSection">
                  {translate('app.filterSection.title')}
                </MuiTypography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  className="button-widget"
                  onClick={handleFilter}
                  disabled={isApplyDisabled}
                >
                  {translate('app.filterSection.apply')}
                </Button>
              </Grid>
            </Grid>
            {props.hasDateFilter && (
              <Grid container spacing={0} className="grid-date-filter-container">
                <Grid item xs={12}>
                  <DatePickerInterval datePickerState={datePickerState} />
                </Grid>
              </Grid>
            )}
            {!widgetData || widgetData.isLoading ? (
              <Loader />
            ) : (
              <>
                <FilterCreator
                  categoryFilterOptions={categoryFilterOptions}
                  filterOptionsByCategory={filterOptionsByCategory}
                  addFilter={addFilter}
                  filtersAdded={filtersAvailable}
                  setIsApplyDisabled={setIsApplyDisabled}
                />
                <FiltersComp
                  filters={filtersAvailable}
                  removeValue={removeValue}
                  removeCategory={removeCategory}
                />
              </>
            )}
          </div>
          <div className={classes.closeContainer} onClick={handleDrawerClose}>
            <ArrowLeftIcon className={classes.iconClose} />
          </div>
        </Paper>
      ) : (
        <Paper elevation={3} className={classes.drawerClose}>
          <FilterTooltip paramsBasedOnRoute={filtersAvailable}>
            <KsIconButton onClick={handleDrawerOpen}>
              <KsIcon icon="ks-filter" />
            </KsIconButton>
          </FilterTooltip>
        </Paper>
      )}
    </>
  );
};

export const FilterSection = KUIConnect(({ translate }) => ({ translate }))(FilterSectionComponent);

export default KUIConnect(({ translate }) => ({ translate }))(FilterSectionComponent);
