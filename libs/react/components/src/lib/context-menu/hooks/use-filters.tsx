import { ContextMenuItem, ContextMenuSectionItem, HandleContextMenuClose } from '../context-menu.model';
import { DataPointWithFormattedValue, FilterTypes } from '@kleeen/types';
import {
  areFiltersInUse,
  getFilterItems,
  useLocalStorage,
  useUrlQueryParams,
  useUserInfo,
} from '@kleeen/react/hooks';
import { useEffect, useState } from 'react';

import { Translate } from '@kleeen/core-react';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useHistory } from 'react-router-dom';

interface UseFilterSectionProps {
  dataPointsToShow: DataPointWithFormattedValue[];
  handleClose: HandleContextMenuClose;
}

export function useFilterSections({
  dataPointsToShow,
  handleClose,
}: UseFilterSectionProps): ContextMenuSectionItem[] {
  // TODO: @cafe refactor this logic into a single hook (reuse in useFilterItems and useFilters variant)
  const history = useHistory();
  const { paramsBasedOnRoute } = useUrlQueryParams({ useNestedObjects: true });
  const _user = useUserInfo();
  const filtersInUse = areFiltersInUse();
  const userName = _user?.userInfo?.username;
  const localStorageKey = userName ? `filters-${history.location.pathname}-${userName}` : null;
  const { setLocalStorageValue } = useLocalStorage(localStorageKey, '');
  const [filterSections, setFilterSections] = useState<ContextMenuSectionItem[]>([]);

  useEffect(() => {
    if (isNilOrEmpty(localStorageKey)) {
      return;
    }

    const tempFilterSections = dataPointsToShow.reduce((acc: ContextMenuSectionItem[], dataPoint) => {
      const { attribute } = dataPoint;
      const filterItems = getFilterItems({
        dataPoint,
        filtersInUse,
        handleClose,
        history,
        paramsBasedOnRoute,
        setLocalStorageValue,
      });

      const filterInItems = filterItems.filter((item) => item.filterType === FilterTypes.in);
      const filterOutItems = filterItems.filter((item) => item.filterType === FilterTypes.out);

      if (!isNilOrEmpty(filterInItems)) {
        const filterInSection = {
          key: 'filterIn',
          label: (
            <Translate
              id="app.contextMenu.filter.addAndApply"
              type="html"
              values={{ value: attribute?.label }}
            />
          ),
          menuItems: filterInItems as ContextMenuItem[],
        };

        acc.push(filterInSection);
      }

      if (!isNilOrEmpty(filterOutItems)) {
        const filterOutSection = {
          key: 'filterIn',
          label: (
            <Translate
              id="app.contextMenu.filter.removeAndApply"
              type="html"
              values={{ value: attribute?.label }}
            />
          ),
          menuItems: filterOutItems as ContextMenuItem[],
        };

        acc.push(filterOutSection);
      }

      return acc;
    }, []);

    setFilterSections(tempFilterSections);
  }, [filtersInUse, dataPointsToShow?.length, localStorageKey]);

  return filterSections;
}
