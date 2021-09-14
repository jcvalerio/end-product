import { Arrow } from '../../Arrow/Arrow';
import { DisplayComponentProps } from '@kleeen/types';
import { useStyles } from '../styles/label.styles';
import classNames from 'classnames';

const bem = 'ks-label-with-change';

export function LabelWithChange({ attribute, highlighted, transformation, value }: DisplayComponentProps) {
  const classes = useStyles();

  return (
    <div className={classNames(bem, classes.label, { highlighted })}>
      <Arrow
        highlighted={highlighted}
        transformation={{
          transformation,
          metadata: attribute.aggregationMetadata,
        }}
        value={value?.displayValue}
      />
    </div>
  );
}
