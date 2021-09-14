import React, { ReactElement, ChangeEventHandler } from 'react';

interface Props {
  theme: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export default function KsThemeSwitcher({ theme, onChange }: Props): ReactElement {
  return (
    <div>
      <select value={theme} onChange={onChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
