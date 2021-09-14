import { KsCrosslink, KsDisplayMedia } from '@kleeen/react/components';

import { DisplayComponentProps } from '@kleeen/types';
import MuiTooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';
import { getColorForSeverityValues } from '@kleeen/frontend/utils';
import { useStyles } from '../styles/label.styles';
import { useTextFormatter } from '@kleeen/react/hooks';

const TRANSFORMATION_KEY_TO_USE = 'transformation';
const bem = 'ks-label';

export function Label({
  attribute,
  format,
  formatType,
  highlighted,
  transformation,
  value,
  widgetId,
}: DisplayComponentProps) {
  const color = getColorForSeverityValues(value?.displayValue, format, transformation);
  const classes = useStyles();
  const [formatter] = useTextFormatter({
    format,
    formatType,
    transformation,
  });

  const formattedValue = formatter(value?.displayValue) || '';

  return (
    <div className={classNames(bem, classes.label, { highlighted })}>
      <KsCrosslink
        dataPoints={[
          {
            attribute,
            transformationKeyToUse: TRANSFORMATION_KEY_TO_USE,
            value,
          },
        ]}
        transformationKeyToUse={TRANSFORMATION_KEY_TO_USE}
        widgetId={widgetId}
      >
        {value?.displayMedia && (
          <div className={classes.displayMedia}>
            <KsDisplayMedia
              className={'ks-label__display-media'}
              color={color}
              size={16}
              type={value?.displayMedia.type}
              value={value?.displayMedia.value}
            />
          </div>
        )}
        <MuiTooltip enterDelay={500} enterNextDelay={500} title={formattedValue} placement="top-start">
          <div className={classNames('ks-label__text', classes.text, { highlighted })} style={{ color }}>
            <span className={classNames(classes.text, { highlighted })}>{formattedValue} </span>
          </div>
        </MuiTooltip>
      </KsCrosslink>
    </div>
  );
}
