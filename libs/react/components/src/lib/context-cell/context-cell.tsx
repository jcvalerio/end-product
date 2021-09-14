import './context-cell.scss';

import {
  AggregationType,
  Attribute,
  Cell,
  ContextMenuDataPoint,
  DisplayMediaType,
  LabelResultsReturnProps,
} from '@kleeen/types';
import { BootstrapTooltip, KsClickableChipsCell } from './components';
import { ContextMenuProps, LabelResultsProps } from './context-cell.model';
import { NEW_ROW_ID_PREFIX, isNilOrEmpty } from '@kleeen/common/utils';
import React, { ReactElement } from 'react';
import { isEmpty, isNil, pathOr } from 'ramda';

import { ArrowPoint } from '../arrowPoint/ArrowPoint';
import { KsCrosslink } from '../crosslink';
import KsDisplayMedia from '../KsDisplayMedia/KsDisplayMedia';
import { TextFormatter } from '../textFormatter/TextFormatter';
import classNames from 'classnames';
import { isAttributeNumericType } from '@kleeen/frontend/utils';
import { useStyles } from './context-cell.style';

const MAX_TEXT_LENGTH = 15;

export function KsContextCell(props: ContextMenuProps): ReactElement | null {
  const classes = useStyles();

  const cell = props.cell as Cell;

  if (isNil(cell)) return null;

  const isMultipleValuesColumn = props.attr?.aggregation === AggregationType.SelfMulti;
  const shouldDisplayClickableChipsCell = isMultipleValuesColumn && Array.isArray(props.cell);

  const beFormat = props.format;
  const ksFormat = pathOr({}, ['attr', 'format'], props);
  const format = isNil(beFormat) || isEmpty(beFormat) ? ksFormat : beFormat;
  const { displayValue, $metadata: metadata } = cell;
  const cellEntityType = metadata?.entityType;
  const isIdTemporary = props?.row?.id?.toString().includes(NEW_ROW_ID_PREFIX);

  if (shouldDisplayClickableChipsCell) {
    return (
      <KsClickableChipsCell
        attribute={props.attr}
        cellEntityType={cellEntityType}
        cellItems={props.cell as Cell[]}
        columnLabel={props.attr?.label}
        displayColumnAttribute={props.displayColumnAttribute}
        format={format}
        isIdTemporary={isIdTemporary}
        openShowMoreModal={props.openShowMoreModal}
        row={props.row}
        rowDisplayValue={props.rowDisplayValue}
        widgetId={props.widgetId}
      />
    );
  }

  const showAppliedFormat = applyFormat(displayValue, props.attr) ?? '';
  const showAppliedTruncated = shouldTruncateText(showAppliedFormat);
  const { results, resultsElement } = labelResults({
    cell,
    changeDirections: props.attr?.aggregationMetadata?.changeDirections,
    format,
    formatType: props.attr?.formatType,
    hasDisplayMedia: props.hasDisplayMedia,
    results: showAppliedFormat,
    transformation: props.attr?.aggregation,
  });
  const isNumericType = isAttributeNumericType(props.attr);
  const tooltipTitle = showAppliedTruncated ? results : '';

  const dataPoints: ContextMenuDataPoint[] = [
    {
      attribute: props.attr,
      value: cell,
    },
  ];

  if (!isNilOrEmpty(props.displayColumnAttribute)) {
    dataPoints.push({
      attribute: props.displayColumnAttribute,
      ignoreInContextMenu: true,
      value: {
        displayValue: props.rowDisplayValue,
        id: props.row.id,
      },
    });
  }

  return (
    <KsCrosslink dataPoints={dataPoints} widgetId={props.widgetId}>
      <span className={classes.mediaValueContainer}>
        {props.hasDisplayMedia && cell.displayMedia.type !== DisplayMediaType.Svg && (
          <KsDisplayMedia
            className={classes.displayMedia}
            size={21}
            type={cell.displayMedia.type}
            value={cell.displayMedia.value}
          />
        )}
        <BootstrapTooltip placement="top" title={tooltipTitle}>
          <span
            className={classNames({
              'text-align-left': !isNumericType,
              'text-align-right': isNumericType,
              'truncate-text': showAppliedTruncated,
            })}
          >
            {resultsElement}
          </span>
        </BootstrapTooltip>
      </span>
    </KsCrosslink>
  );
}

//#region Private members
function applyFormat(value: any, attr: Attribute): any {
  const type = attr?.deepDataType;
  if (type === 'boolean') return value ? 'True' : 'False';
  if (React.isValidElement(value)) return value; // FIXME: Please consider this comment: https://github.com/KLEEEN-SOFTWARE/kapitan/pull/1800/files?file-filters%5B%5D=.tsx#r600664986
  if (typeof value === 'object') return value?.displayValue;

  return value;
}

function labelResults({
  cell,
  changeDirections,
  format,
  formatType,
  hasDisplayMedia,
  results,
  transformation,
}: LabelResultsProps): LabelResultsReturnProps {
  const labelReturn: LabelResultsReturnProps = {
    results,
    resultsElement: (
      <TextFormatter
        cell={cell}
        format={format}
        formatType={formatType}
        hasDisplayMedia={hasDisplayMedia}
        textAlignment="flex-end"
        transformation={transformation || AggregationType.SelfSingle}
      >
        {results}
      </TextFormatter>
    ),
  };

  if (transformation === AggregationType.ChangePercent || transformation === AggregationType.ChangeCount) {
    labelReturn.results = Math.abs(results as number);
    labelReturn.resultsElement = (
      <ArrowPoint
        changeDirections={changeDirections}
        className="context-cell-arrow"
        result={results as number}
        showPercentage={transformation === AggregationType.ChangePercent}
      />
    );
  }

  return labelReturn;
}

function shouldTruncateText(text: string): boolean {
  return text ? text.toString().trim().length >= MAX_TEXT_LENGTH : false;
}
//#endregion
