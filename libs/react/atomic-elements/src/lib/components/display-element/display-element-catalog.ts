import {
  BinaryView,
  Chips,
  Label,
  LabelWithChange,
  SparklineMaxLargest,
  TrendSparkline,
  TrendSparklineHighLow,
  TrendSparklineVsEnd,
  TrendSparklineVsStart,
} from './components';
import { DisplayCatalog, DisplayComponentProps, DisplayElement, ElementDisplayType } from '@kleeen/types';

const displayCatalog: DisplayCatalog = {
  [ElementDisplayType.BinaryView]: BinaryView,
  [ElementDisplayType.Chips]: Chips,
  [ElementDisplayType.Label]: Label,
  [ElementDisplayType.LabelWithChange]: LabelWithChange,
  [ElementDisplayType.SparklineMaxLargest]: SparklineMaxLargest,
  [ElementDisplayType.TrendSparkline]: TrendSparkline,
  [ElementDisplayType.TrendSparklineHighLow]: TrendSparklineHighLow,
  [ElementDisplayType.TrendSparklineVsEnd]: TrendSparklineVsEnd,
  [ElementDisplayType.TrendSparklineVsStart]: TrendSparklineVsStart,
};

export function getDisplayElement(displayComponent: ElementDisplayType): DisplayElement {
  return displayCatalog[displayComponent] || Default;
}

//#region Private members
function Default({ element }: DisplayComponentProps) {
  console.info(`${element} does not exist in the display catalog`);
  return null;
}
//#endregion
