interface IRadioOption {
  id: string;
  value: string;
}

export interface IRadioGroupFormProps {
  title: string;
  options: IRadioOption[];
  value: string;
  onChange: () => {};
}
