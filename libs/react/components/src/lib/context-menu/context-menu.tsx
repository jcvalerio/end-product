import { ContextMenuProps, ContextMenuSectionItem, FormattedContextDataPoint } from './context-menu.model';
import { Menu, MenuTitle } from './contextual-menu.style';
import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  useCrossLinkingSections,
  useDataPointsWithFormattedValue,
  useFilterSections,
  useInvestigations,
  usePreviewSections,
} from './hooks';
import { useHoverIntent, useIsInvestigation, useTheme } from '@kleeen/react/hooks';

import { AggregationType } from '@kleeen/types';
import { ContextMenuItemView } from './context-menu-item';
import { ContextMenuSection } from './context-menu-section';
import { DEFAULT_TRANSFORMATION_KEY_TO_USE } from './utils';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { isSingleCardinalityTransformation } from '@kleeen/frontend/utils';
import { path } from 'ramda';

export function KsContextMenu({ anchorEl, autoClose, dataPoints, handleClose, widgetId }: ContextMenuProps) {
  const formattedDataPoints = useDataPointsWithFormattedValue({ dataPoints });
  const { ref } = useHoverIntent<HTMLUListElement>({
    delayOnEnter: 0,
    onMouseEnterFn: clearTimeOut,
    onMouseLeaveFn: handleClose,
  });
  const isInvestigationPage = useIsInvestigation();
  const timerRef = useRef(null);
  const [dataPointsToShow, setDataPointsToShow] = useState<FormattedContextDataPoint[]>([]);
  const [menuSections, setMenuSections] = useState<ContextMenuSectionItem[]>([]);
  const [menuTitle, setMenuTitle] = useState<ReactNode>();
  const { themeClass } = useTheme();

  const crossLinkSection = useCrossLinkingSections({ dataPointsToShow, handleClose });
  const filterSections = useFilterSections({ dataPointsToShow, handleClose });
  const previewSections = usePreviewSections({
    dataPoints: formattedDataPoints,
    dataPointsToShow,
    handleClose,
  });
  const investigationSections = useInvestigations({
    dataPoints: formattedDataPoints,
    dataPointsToShow,
    handleClose,
    widgetId,
  });

  useEffect(() => {
    if (autoClose) {
      timerRef.current = setTimeout(() => {
        handleClose();
      }, 2000);

      return () => {
        clearTimeout(timerRef.current);
      };
    }
  }, []);

  useEffect(() => {
    const shouldNotSetDataPointsToShow = isInvestigationPage || isNilOrEmpty(dataPoints);

    if (shouldNotSetDataPointsToShow) {
      return;
    }

    const tempFilteredDataPoints = formattedDataPoints
      .filter(({ ignoreInContextMenu = false }) => !ignoreInContextMenu)
      .sort((a, b) => {
        const aCardinalityWeight = Number(
          isSingleCardinalityTransformation(a.attribute.aggregation as AggregationType),
        );
        const bCardinalityWeight = Number(
          isSingleCardinalityTransformation(b.attribute.aggregation as AggregationType),
        );
        return bCardinalityWeight - aCardinalityWeight;
      });

    setDataPointsToShow(tempFilteredDataPoints);
  }, [formattedDataPoints?.length, isInvestigationPage]);

  useEffect(() => {
    if (isNilOrEmpty(dataPointsToShow)) {
      return;
    }

    const [firstDataPoint] = dataPointsToShow;
    // TODO @cafe THIS MUST BE REMOVED ONCE WE GET RID OF THE AGGREGATION VS TRANSFORMATION DILEMMA.
    const { transformationKeyToUse = DEFAULT_TRANSFORMATION_KEY_TO_USE } = firstDataPoint;
    const attributeTransformation = path<AggregationType>([transformationKeyToUse], firstDataPoint.attribute);
    const isSingleCardinality = isSingleCardinalityTransformation(attributeTransformation);

    const newMenuTitle = `${firstDataPoint.formattedValue} ${
      !isSingleCardinality ? firstDataPoint.attribute.name : ''
    }`;
    setMenuTitle(newMenuTitle);
  }, [dataPointsToShow?.length]);

  useEffect(() => {
    const sectionItems: ContextMenuSectionItem[] = [];

    if (!isNilOrEmpty(crossLinkSection)) {
      sectionItems.push(...crossLinkSection);
    }

    if (!isNilOrEmpty(filterSections)) {
      sectionItems.push(...filterSections);
    }

    if (!isNilOrEmpty(previewSections)) {
      sectionItems.push(...previewSections);
    }

    if (!isNilOrEmpty(investigationSections)) {
      sectionItems.push(...investigationSections);
    }

    setMenuSections(sectionItems);
  }, [
    crossLinkSection?.length,
    filterSections?.length,
    previewSections?.length,
    investigationSections?.length,
  ]);

  function clearTimeOut() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  if (isNilOrEmpty(menuSections)) return null;

  return (
    <Menu
      MenuListProps={{ ref }}
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'center',
      }}
      className={themeClass}
      data-testid="context-menu"
      getContentAnchorEl={null}
      id="context-menu"
      onClose={handleClose}
      open={Boolean(anchorEl)}
    >
      <MenuTitle>{menuTitle}</MenuTitle>
      {menuSections.map((section) => {
        const { menuItems } = section;

        return (
          <ContextMenuSection section={section}>
            {menuItems.map((item, index) => (
              <ContextMenuItemView index={index} item={item} />
            ))}
          </ContextMenuSection>
        );
      })}
    </Menu>
  );
}
