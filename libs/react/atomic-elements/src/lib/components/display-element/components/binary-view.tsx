import { DisplayComponentProps } from '@kleeen/types';
import classnames from 'classnames';

const bem = 'ks-binary-view';

export function BinaryView({ value }: DisplayComponentProps) {
  const displayValue = value?.displayValue ? 'True' : 'False';

  return (
    <>
      <span className={classnames(bem)}>{displayValue}</span>
    </>
  );
}
