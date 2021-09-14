import { ReactNode } from 'react';
import { useTextFormatter } from './useTextFormatter';

type TODO = any;

export const useTextFormattersForViz = ({
  groupBy,
  value,
}: {
  // TODO: @cafe Potentially GroupByProps, ValuesProps & ValueProps from @kleeen/types, but those are missing .format
  groupBy?: TODO;
  value?: TODO;
}): [(value: ReactNode) => ReactNode, (value: ReactNode) => ReactNode, (value: ReactNode) => ReactNode] => {
  const [formatterGroupBy] = useTextFormatter({
    format: groupBy?.format,
    formatType: groupBy?.formatType,
    transformation: groupBy?.transformation,
  });
  const [formatterGroupByForTooltip] = useTextFormatter({
    format: groupBy?.format,
    formatType: groupBy?.formatType,
    transformation: groupBy?.transformation,
  });
  const [formatterValue] = useTextFormatter({
    format: value?.format,
    formatType: value?.formatType,
    transformation: value?.transformation,
  });

  return [formatterGroupBy, formatterGroupByForTooltip, formatterValue];
};
