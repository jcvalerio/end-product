import './ButtonFilter.scss';

import { Filter, FilterOption, FilterSectionEnum, Params } from '../../../FilterSection/FilterSection.model';
import { useFilterContext, useFilters } from '@kleeen/react/hooks';

import { ButtonFilterProps } from './ButtonFilter.model';
import { ButtonSubHeader } from '../ButtonHeader/ButtonSubHeader';
import { ContainerHeader } from '../ContainerHeader/ContainerHeader';
import FilterCreatorWithChips from '../../../FilterSection/components/FilterCreatorWithChips';
import React from 'react';
import { Tooltip } from '../../../FilterSection/FilterSection.styles';
import { filterTooltipFunc } from '../../../FilterSection/components/FilterTooltip';
import { isNil } from 'ramda';
import { FilterOperators } from '@kleeen/types';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { cleanUnavailableFilters, isSomeFilterUnavailable } from '@kleeen/frontend/utils';

const parseToFilterOptions = (options: string[]): FilterOption[] =>
  options.map((option) => ({
    name: option,
    section: FilterSectionEnum.Values,
    operator: FilterOperators.in,
  }));

export const ButtonFilter = ({
  outContainer,
  filters: filtersProps,
  taskName,
  translate,
}: ButtonFilterProps): React.ReactElement => {
  const [isShow, setIsShow] = React.useState(false);

  const {
    handleFilterWithoutTimestamp,
    removeValue,
    addFilter,
    removeCategory,
    queryParams,
    isApplyWithoutTimeDisabled,
    filtersAdded,
    clearFilters,
    setIsApplyWithoutTime,
  } = useFilters();
  const { paramsBasedOnRoute, version } = queryParams;
  const [filtersAddedClone, setFiltersAddedClone] = React.useState(filtersAdded);
  const [paramsBasedOnRouteClone, setParamsBasedOnRouteClone] = React.useState(paramsBasedOnRoute);
  const handleFilterWithoutTimestampClone = (): void => {
    handleFilterWithoutTimestamp();
    setParamsBasedOnRouteClone(filtersAddedClone);
  };

  React.useEffect(() => {
    setFiltersAddedClone(filtersAdded);
    if (!isNil(filtersAddedClone?.Timestamp)) {
      delete filtersAddedClone.Timestamp;
    }
  }, [filtersAdded]);

  React.useEffect(() => {
    if (!isNil(paramsBasedOnRouteClone?.Timestamp)) {
      delete paramsBasedOnRouteClone.Timestamp;
    }
  }, [paramsBasedOnRouteClone]);

  React.useEffect(() => {
    setParamsBasedOnRouteClone(paramsBasedOnRoute);
  }, [version]);

  const availableAttributesToFilter = filtersProps || [];

  const categoryFilterOptions = availableAttributesToFilter.map(({ name, statisticalType }) => ({
    name,
    section: translate('app.subHeader.filterSection.filterBy'),
    statisticalType,
  }));

  const params: Params = {
    baseModel: 'filters',
    attributes: availableAttributesToFilter.map(({ name }) => name).join(),
    operationName: 'filters',
  };
  const widgetData = useFilterContext({ taskName, widgetId: 'filters', params });
  const { results: filters }: Filter = (widgetData && widgetData.data) || {};
  const filterOptionsByCategory = filters
    ? filters.reduce(
        (acc, [filterName, options]) => ((acc[filterName] = parseToFilterOptions(options)), acc),
        {},
      )
    : {};

  const onClearFilters = (e): void => {
    clearFilters();
    Object.keys(filtersAdded).map((key) => {
      removeCategory(key);
    });
    handleFilterWithoutTimestampClone();
  };

  const shouldClearUnavailableFilters =
    !isNilOrEmpty(filtersAddedClone) &&
    !isNilOrEmpty(filterOptionsByCategory) &&
    isSomeFilterUnavailable(filtersAddedClone, filterOptionsByCategory);
  const filtersAvailable = shouldClearUnavailableFilters
    ? cleanUnavailableFilters(filtersAddedClone, filterOptionsByCategory)
    : filtersAddedClone;

  const filterSummary = filterTooltipFunc(filtersAvailable, translate);

  return (
    <>
      <Tooltip
        title={filterSummary.title}
        PopperProps={filterSummary.PopperProps}
        placement="right"
        interactive
      >
        <div className="button-tooltip">
          <ButtonSubHeader
            icon="ks-filter"
            className="element-button-filter"
            name={translate('app.subHeader.buttonFilter.appliedFilters')}
            countElement={filterSummary.badgeContent}
            setIsShow={setIsShow}
            translate={translate}
            isShow={isShow}
          />
        </div>
      </Tooltip>
      <ContainerHeader
        className="button-container-filter-actions"
        filtersAdded={filtersAvailable}
        isApplyDisabled={isApplyWithoutTimeDisabled}
        isShow={isShow}
        onClearFilters={onClearFilters}
        onFilter={handleFilterWithoutTimestampClone}
        outContainer={outContainer}
        setIsShow={setIsShow}
        translate={translate}
        container={
          <FilterCreatorWithChips
            categoryFilterOptions={categoryFilterOptions}
            filterOptionsByCategory={filterOptionsByCategory}
            addFilter={addFilter}
            filtersAdded={filtersAvailable}
            setIsApplyDisabled={setIsApplyWithoutTime}
            removeValue={removeValue}
            removeCategory={removeCategory}
            translate={translate}
          />
        }
      />
    </>
  );
};
