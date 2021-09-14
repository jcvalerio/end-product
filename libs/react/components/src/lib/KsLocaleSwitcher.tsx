import React, { ReactElement, ChangeEventHandler } from 'react';

interface Props {
  locale: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export default function KsLocaleSwitcher({ locale, onChange }: Props): ReactElement {
  return (
    <div>
      <select value={locale} onChange={onChange}>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
}
