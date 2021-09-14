import React, { ReactElement } from 'react';

import { DataListItem } from '@kleeen/types';
import { ListHeader } from './ListHeader';
import { ListProps } from './List.model';
import classnames from 'classnames';
import { styleList } from './list.style';

const bem = 'ks-list';

function categoricalSort(a: string, b: string): number {
  return a.localeCompare(b);
}

function numericalSort(a: number, b: number): number {
  return b - a;
}

const sortByType: { [key in 'string' | 'number']: (a: any, b: any) => number } = {
  string: categoricalSort,
  number: numericalSort,
};

export function List({
  columns,
  data,
  hideHeader,
  sortBy,
  ListItemComponent,
  ListItemProps,
}: ListProps): ReactElement {
  const classesStyleList = styleList();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchKey, setSearchKey] = React.useState('');
  const [sortedData, setSearchResults] = React.useState(data);

  React.useEffect(() => {
    if (data) renderData(data, searchTerm);
  }, [data, searchTerm]);

  function renderData(dataResults: DataListItem[], searchTermParam: string) {
    let results = sortBy
      ? dataResults.sort(function (a, b) {
          const aValue = a[sortBy].displayValue;
          const bValue = b[sortBy].displayValue;
          return sortByType?.[typeof aValue]?.(aValue, bValue);
        })
      : dataResults;
    if (searchTermParam) {
      results = results.filter((dataPoint) => {
        return String(dataPoint[searchKey]?.displayValue)
          .toLowerCase()
          .includes(searchTermParam.toLowerCase());
      });
    }
    setSearchResults(results);
  }

  return (
    <ul className={classnames(bem, classesStyleList.list)}>
      {!hideHeader ? (
        <ListHeader columns={columns} setSearchTerm={setSearchTerm} setSearchKey={setSearchKey}></ListHeader>
      ) : (
        ''
      )}
      {sortedData.map((dataPoint, i) => (
        <ListItemComponent key={i} {...ListItemProps} item={dataPoint} />
      ))}
    </ul>
  );
}
