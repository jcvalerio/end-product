import IntlMessageFormat from 'intl-messageformat';
import React from 'react';
import { useLocalization } from '@kleeen/react/hooks';

export const KsIntlMessage = ({
  message,
}: {
  message: string | { msg: string; values: { [key: string]: any } };
}) => {
  const { language } = useLocalization();
  let intlMessage = message;
  if (typeof message === 'object') {
    intlMessage = new IntlMessageFormat(message.msg, language).format(message.values) as string;
  }
  return <>{intlMessage}</>;
};
