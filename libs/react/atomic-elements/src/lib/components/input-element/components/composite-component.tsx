import { InputComponentProps } from '@kleeen/types';
import { isNilOrEmpty } from '@kleeen/common/utils';

export function CompositeComponent(props: InputComponentProps) {
  const { autoCompleteValues, getInputElement, rules } = props;

  const { component: firstValidComponentName } = rules.find((rule) => {
    if (isNilOrEmpty(rule.maxChoices)) {
      return true;
    }

    return autoCompleteValues.length <= rule.maxChoices;
  });

  if (isNilOrEmpty(firstValidComponentName)) {
    console.error(`CompositeComponent: could not find a valid component. Rules = ${JSON.stringify(rules)}`);
    return null;
  }

  const InputComponent = getInputElement(firstValidComponentName);

  return <InputComponent {...props} />;
}
