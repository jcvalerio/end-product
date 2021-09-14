import { BaseInputComponentProps, ListItem } from '@kleeen/types';

import { INITIAL_ATTRIBUTE_VALUE_HAS_MANY } from '../../../Widgets/ConfigInputWidget/ConfigInputWidget.model';
import { KsToken } from '@kleeen/react/components';
import { getOptionLabel } from '../../utils';
import { isNilOrEmpty } from '@kleeen/common/utils';

interface BaseTokenProps extends BaseInputComponentProps {
  isAddable: boolean;
  options: ListItem[];
}

export function BaseToken(props: BaseTokenProps) {
  const inputValue = isNilOrEmpty(props.value) ? INITIAL_ATTRIBUTE_VALUE_HAS_MANY : props.value;

  return (
    <KsToken
      format={props.format}
      formatType={props.formatType}
      getOptionLabel={getOptionLabel}
      isAddable={props.isAddable}
      onChange={(_, options, eventType: string) => {
        if (eventType === 'create-option' && props.isAddable) {
          const lastOption: string = options[options.length - 1];
          const lastOptionAsListItem: ListItem = { displayValue: lastOption };
          const newOptions = [...options.slice(0, options.length - 1), lastOptionAsListItem];

          props.setSelectedOption(newOptions);
          props.setValue(newOptions);
        } else {
          props.setSelectedOption(options);
          props.setValue(options);
        }
      }}
      options={props.options}
      placeholder={''} // TODO: @cafe set this as optional
      value={inputValue}
    />
  );
}
