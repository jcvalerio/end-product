import './components/RadioGroup.scss';

import { RadioGroupComponent } from './components';
import { RadioGroupProps } from './RadioGroup.model';

export function RadioGroup(props: RadioGroupProps): JSX.Element {
  return (
    <div className="radio-group-container">
      <RadioGroupComponent {...props} />
    </div>
  );
}
