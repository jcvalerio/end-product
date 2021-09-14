import { ILocalization, IWaterfallPlottingResult, PlottedPoint } from './waterfallTypes';

import { isNilOrEmpty } from '@kleeen/common/utils';
import { useTextFormattersForViz } from '@kleeen/react/hooks';

const UP_ARROW = '▲';
const DOWN_ARROW = '▼';
/**
 * Tooltip format:
 * https://kleeensoftware.invisionapp.com/console/Elements---Visualizations-ckccf5hbo02ib01znu7p3flyl/ckg196xjj01be01246igg44nb/play
 *
 * @param previous -  value of delta (difference of values)
 * @param current - actual value (NOT delta)
 * @param next -  value of delta (difference of values)
 */
// TODO: Use translations for 'from', 'is', 'to'
export const getCombinedTooltipMessage = (
  previous: PlottedPoint,
  current: PlottedPoint,
  next: PlottedPoint,
): string => {
  let tooltipMessage = '';

  /** Symbol in front of other value (either previous or next) */
  // const upOrDownCharPrev = current.value > current.value + previous.value ? '▲' : '▼';
  const upOrDownCharPrev = previous.value > 0 ? UP_ARROW : DOWN_ARROW;
  const upOrDownCharNext = next.value < 0 ? UP_ARROW : DOWN_ARROW;

  tooltipMessage += `${current.category} is ${current.value}<br/>`;
  if (!isNilOrEmpty(previous.value) && !isNilOrEmpty(previous.category)) {
    if (previous.value !== 0) {
      tooltipMessage += `${upOrDownCharPrev} ${previous.value} from ${previous.category} <br/>`;
    }
  }
  if (!isNilOrEmpty(next.value) && !isNilOrEmpty(next.category)) {
    if (next.value !== 0) {
      tooltipMessage += `${upOrDownCharNext} ${next.value} to ${next.category}`;
    }
  }
  return tooltipMessage;
};

export const getWaterfallTooltipOptions = (
  completedResults: IWaterfallPlottingResult[],
  xAxisCategories: number[] | string[],
  secondSliceOfResults: IWaterfallPlottingResult[],
  sliceResultsBy: number,
  localization: ILocalization,
  originalCategoryForOther: string | number,
  averageSecondSliceOfResults: number,
  params,
) => {
  // TODO: use Highcharts.TooltipOptions but with 'this' extended
  const [formatterGroupByForTooltip] = useTextFormattersForViz(params);
  return {
    tooltip: {
      formatter(this) {
        /** Is Other */
        if (this.x == localization.restOfResultsLabel) {
          return `${localization.restOfResultsLabel} ${secondSliceOfResults.length} categories <br> Average: ${averageSecondSliceOfResults}`;
        }

        let previous = {
          category: '',
          value: 0,
        } as PlottedPoint;

        if (this.point.options.index === 0) {
          /** Handle first */
          previous = {
            category: '',
            value: 0,
          };
        } else {
          /** Previous is "Other" */
          let previousCategoryTooltip;
          if (this.point.options.index === sliceResultsBy + 1) {
            previousCategoryTooltip = formatterGroupByForTooltip(originalCategoryForOther);
          } else {
            previousCategoryTooltip = formatterGroupByForTooltip(
              xAxisCategories[this.point.options.index - 1],
            );
          }
          previous = {
            category: previousCategoryTooltip,
            value: completedResults[this.point.options.index].y, // Current - Prev (delta is y for plotting)
          };
        }

        const current = {
          category: formatterGroupByForTooltip(this.point.category),
          value: completedResults[this.point.options.index].originalY,
        };
        let nextCategoryTooltip;
        let nextValueTooltip;
        if (this.point.options.index === sliceResultsBy - 1) {
          nextCategoryTooltip = formatterGroupByForTooltip(originalCategoryForOther);
          nextValueTooltip = secondSliceOfResults[0].y;
        } else {
          nextCategoryTooltip = formatterGroupByForTooltip(xAxisCategories[this.point.options.index + 1]);
          nextValueTooltip = completedResults[this.point.options.index + 1].y;
        }

        const next = {
          category: nextCategoryTooltip,
          value: nextValueTooltip, // Next - Current (delta is y for plotting)
        };

        return getCombinedTooltipMessage(previous, current, next);
      },
    },
  };
};
