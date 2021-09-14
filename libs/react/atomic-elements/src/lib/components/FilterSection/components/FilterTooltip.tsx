import { Badge, Tooltip } from '../FilterSection.styles';
import { FilterAdded } from '../FilterSection.model';

import { FilterOperators, IntervalDate } from '@kleeen/types';
import { KUIConnect } from '@kleeen/core-react';
import { useTheme } from '@kleeen/react/hooks';
import moment from 'moment';
import React, { ReactElement } from 'react';
import classnames from 'classnames';

const bem = 'ks-filter-tooltip';

export const filterTooltipFunc = (
  paramsBasedOnRoute,
  translate,
): {
  title: ReactElement;
  PopperProps: { className?: string; style?: { [key: string]: any } };
  badgeContent: number;
} => {
  if (!paramsBasedOnRoute) {
    return {
      PopperProps: {},
      badgeContent: 0,
      title: <></>,
    };
  }

  const filterTitles = Object.keys(paramsBasedOnRoute);
  const filtersMap: FilterAdded[] = Object.values(paramsBasedOnRoute).map((filter) => filter);
  const { themeClass } = useTheme();

  const getIntervalDateKey = (value: string): string => {
    let auxKey = '';
    Object.keys(IntervalDate).forEach((key) => {
      if (value === IntervalDate[key]) {
        auxKey = key;
      }
    });
    return auxKey;
  };

  return {
    PopperProps: { className: `${themeClass}`, style: { zIndex: 2 } },
    badgeContent: filterTitles.length,
    title: (
      <ul className={classnames(bem)}>
        <li className={classnames(`${bem}__item--applied`)}>{`${filterTitles.length} ${translate(
          'app.subHeader.buttonFilter.currentFilters',
        )}`}</li>

        {filterTitles.map((title, i) => (
          <>
            <span>{title}:</span>
            {filtersMap[i][FilterOperators.in]?.map((filter) => (
              <li>• {filter}</li>
            ))}
            {filtersMap[i][FilterOperators.max] && <li>• Maximum is {filtersMap[i][FilterOperators.max]}</li>}
            {filtersMap[i][FilterOperators.min] && <li>• Minimum is {filtersMap[i][FilterOperators.min]}</li>}
            {filtersMap[i][FilterOperators.from] && (
              <li>• From {moment(filtersMap[i][FilterOperators.from]).format('DD/MM/YYYY HH:ss')}</li>
            )}
            {filtersMap[i][FilterOperators.to] && (
              <li>• To {moment(filtersMap[i][FilterOperators.to]).format('DD/MM/YYYY HH:ss')}</li>
            )}
            {filtersMap[i][FilterOperators.relativeDate] && (
              <li>
                {translate(
                  'app.dateInterval.interval.' +
                    getIntervalDateKey(filtersMap[i][FilterOperators.relativeDate]),
                )}
              </li>
            )}
          </>
        ))}
      </ul>
    ),
  };
};

const FilterTooltipComponent = (props: { children; paramsBasedOnRoute; translate }): ReactElement => {
  const filter = filterTooltipFunc(props.paramsBasedOnRoute, props.translate);

  return (
    <Tooltip title={filter.title} PopperProps={filter.PopperProps} placement="right" interactive>
      <Badge badgeContent={filter.badgeContent} color="primary">
        {props.children}
      </Badge>
    </Tooltip>
  );
};

const FilterTooltip = React.memo(KUIConnect(({ translate }) => ({ translate }))(FilterTooltipComponent));

export default FilterTooltip;
