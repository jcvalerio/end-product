import { KsClickableChipsCell, ListingModal } from '@kleeen/react/components';

import { DisplayComponentProps } from '@kleeen/types';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useState } from 'react';

export function Chips({ attribute, format, value, widgetId }: DisplayComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  // TODO: @cafe add i18n key for this
  // TODO: @cafe find a way to get the displayDataPoint  and pass it to KsClickableChipsCell
  if (isNilOrEmpty(value)) {
    return <>{'No values'}</>;
  }

  return (
    <>
      <KsClickableChipsCell
        attribute={attribute}
        cellItems={value}
        columnLabel={attribute.label}
        format={format}
        isIdTemporary={false}
        openShowMoreModal={() => setIsOpen(true)}
        widgetId={widgetId}
      />
      {isOpen && (
        <ListingModal
          attribute={attribute}
          columnLabel={attribute.label}
          data={value}
          format={format}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          widgetId={widgetId}
        />
      )}
    </>
  );
}
