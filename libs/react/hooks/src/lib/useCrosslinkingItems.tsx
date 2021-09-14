import { Attribute, Cell, DataPoint } from '@kleeen/types';
import { CrossLink, useCrosslinking } from './useCrosslinking';
import { ReactNode, useEffect, useState } from 'react';

import { Translate } from '@kleeen/core-react';
import { flatten } from 'ramda';
import { isLinkFilterableByEntityType } from '../helpers';
import { isNilOrEmpty } from '@kleeen/common/utils';

type CrossLinkItem = {
  handleClick: (item: CrossLinkItem) => (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  label: ReactNode;
  key: string;
  roleAccessKey: string;
  slug: string;
};

export function useCrossLinkingItems({
  handleClose,
  attr,
  cell,
}: {
  handleClose: () => void;
  attr: Attribute;
  cell: Cell;
}): CrossLinkItem[] {
  const { crosslink } = useCrosslinking();
  const [crossLinkItems, setCrossLinkItems] = useState([]);

  useEffect(() => {
    const tempCrossLinkItems = getCrossLinkingItems({
      crosslink,
      dataPoint: {
        attribute: attr,
        value: cell,
      },
      handleClose,
    });
    setCrossLinkItems(tempCrossLinkItems);
  }, [cell?.id, attr?.name]);

  return crossLinkItems;
}

export function getCrossLinkingItems({
  crosslink,
  dataPoint,
  handleClose,
}: {
  crosslink: CrossLink;
  dataPoint: DataPoint;
  handleClose: () => void;
}) {
  const { attribute, value } = dataPoint;

  if (isNilOrEmpty(attribute?.crossLinking) || isNilOrEmpty(value.id)) {
    return [];
  }

  const handleClick =
    ({ openNewTab }: { openNewTab: boolean }) =>
    ({ slug }) =>
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.preventDefault();
      handleClose();
      crosslink(slug, value, attribute, openNewTab);
    };

  const cellEntityType = value?.$metadata?.entityType;
  const tempCrossLinkItems = attribute?.crossLinking
    .filter((link) => isLinkFilterableByEntityType(cellEntityType, link))
    .map((link) => [
      {
        handleClick: handleClick({ openNewTab: false }),
        label: <Translate id="app.contextMenu.goTo" type="html" values={{ link: link.title }} />,
        key: `new.tab.${link?.slug}${link?.title}`,
        roleAccessKey: `navigation.${link?.title}`,
        slug: link.slug,
      },
      {
        handleClick: handleClick({ openNewTab: true }),
        label: <Translate id="app.contextMenu.goToNewTab" type="html" values={{ link: link.title }} />,
        key: `${link?.slug}${link?.title}`,
        roleAccessKey: `navigation.${link?.title}`,
        slug: link.slug,
      },
    ]);

  return flatten(tempCrossLinkItems);
}
