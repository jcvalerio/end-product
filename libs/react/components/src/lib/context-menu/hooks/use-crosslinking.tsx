import { ContextMenuItem, ContextMenuSectionItem, HandleContextMenuClose } from '../context-menu.model';
import { getCrossLinkingItems, useCrosslinking } from '@kleeen/react/hooks';
import { useEffect, useState } from 'react';

import { DataPointWithFormattedValue } from '@kleeen/types';
import { Translate } from '@kleeen/core-react';
import { isNil } from 'ramda';
import { isNilOrEmpty } from '@kleeen/common/utils';

interface UseCrossLinkingSectionProps {
  dataPointsToShow: DataPointWithFormattedValue[];
  handleClose: HandleContextMenuClose;
}

export function useCrossLinkingSections({
  dataPointsToShow,
  handleClose,
}: UseCrossLinkingSectionProps): ContextMenuSectionItem[] {
  const { crosslink } = useCrosslinking();
  const [crossLinkSections, setCrossLinkSections] = useState<ContextMenuSectionItem[]>([]);

  useEffect(() => {
    if (isNil(crosslink)) {
      return;
    }

    if (isNilOrEmpty(dataPointsToShow)) {
      return;
    }

    const tempCrossLinkSections = dataPointsToShow.reduce((acc: ContextMenuSectionItem[], dataPoint) => {
      const crossLinkItems = getCrossLinkingItems({
        crosslink,
        dataPoint,
        handleClose,
      });

      if (isNilOrEmpty(crossLinkItems)) {
        return acc;
      }

      const crossLinkSection = {
        key: 'crosslinking',
        label: (
          <Translate
            id="app.contextMenu.goTo.value"
            type="html"
            values={{ value: dataPoint.formattedValue as string }}
          />
        ),
        menuItems: crossLinkItems as ContextMenuItem[],
      };
      acc.push(crossLinkSection);
      return acc;
    }, []);

    setCrossLinkSections(tempCrossLinkSections);
  }, [dataPointsToShow?.length]);

  return crossLinkSections;
}
