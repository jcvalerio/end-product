import { BasePie } from './base';
import { DisplayComponentProps } from '@kleeen/types';
import { Label } from './label';
import { pathOr } from 'ramda';
import { useStyles } from '../styles/sparkline-max-largest.styles';
import classnames from 'classnames';

const bem = 'ks-spark-line-max-largest';

export function SparklineMaxLargest(props: DisplayComponentProps) {
  const classes = useStyles();

  const { element, value, ...restOfProps } = props;
  const labelDisplayValue = pathOr('', ['displayValue', '0'], value);
  const labelValue = {
    displayValue: labelDisplayValue,
  };

  return (
    <div className={classnames(bem, classes.content)}>
      <BasePie data={value?.displayValue} highlighted={props.highlighted} />
      <Label {...restOfProps} value={labelValue} />
    </div>
  );
}
