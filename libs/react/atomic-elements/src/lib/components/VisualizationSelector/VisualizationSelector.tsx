import './VisualizationSelector.scss';

import { KUIConnect } from '@kleeen/core-react';
import React from 'react';
import { Tooltip } from '@material-ui/core';
import { WidgetTypes } from '@kleeen/types';

interface VisualizationSelectorProps {
  items: WidgetTypes[];
  onItemPress: React.Dispatch<React.SetStateAction<number>>;
  preferredWidgetIndex: number;
  translate: (key: string) => string;
}

interface VisualizationSelectorItemProps {
  itemIndex: number;
  value: WidgetTypes;
  isSelected: boolean;
  isLast: boolean;
  onPress: React.Dispatch<React.SetStateAction<number>>;
  translate: (key: string) => string;
}

const VisualizationSelectorItem = ({
  itemIndex,
  value,
  isSelected,
  isLast,
  onPress,
  translate,
}: VisualizationSelectorItemProps): JSX.Element => {
  const handleOnClick = (): void => {
    if (onPress) {
      onPress(itemIndex);
    }
  };

  return (
    <Tooltip title={translate(`app.visualizationType.${value}`)}>
      <div
        onClick={handleOnClick}
        className={`visualization-selector-item${isSelected ? '-selected' : ''}`}
        style={{
          marginRight: isLast ? '0px' : '6px',
        }}
      />
    </Tooltip>
  );
};

const VisualizationSelectorComponent = ({
  items,
  onItemPress,
  preferredWidgetIndex,
  translate,
}: VisualizationSelectorProps): JSX.Element => {
  return (
    <div className="visualization-selector-container">
      {items.map((item, itemIndex) => {
        return (
          <VisualizationSelectorItem
            key={itemIndex}
            itemIndex={itemIndex}
            value={item}
            isSelected={itemIndex === preferredWidgetIndex}
            isLast={itemIndex === items.length - 1}
            onPress={onItemPress}
            translate={translate}
          />
        );
      })}
    </div>
  );
};

export const VisualizationSelector = KUIConnect(({ translate }) => ({ translate }))(
  VisualizationSelectorComponent,
);
