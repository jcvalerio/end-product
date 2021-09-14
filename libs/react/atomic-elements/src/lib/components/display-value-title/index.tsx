import { FormatProps } from '@kleeen/types';
import { TextFormatter } from '@kleeen/react/components';

interface DisplayValueTitleProps {
  displayValue?: string;
  format?: FormatProps;
  formatType?: string;
}

export function DisplayValueTitle({ displayValue, format, formatType }: DisplayValueTitleProps): JSX.Element {
  return (
    <TextFormatter format={format} formatType={formatType} transformation="selfSingle">
      {displayValue}
    </TextFormatter>
  );
}
