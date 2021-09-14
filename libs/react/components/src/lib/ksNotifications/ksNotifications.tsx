import React, { useEffect } from 'react';
import { useKleeenActions, useKleeenContext } from '@kleeen/react/hooks';

import { useSnackbar } from 'notistack';

let displayed = [];

const KsNotifications = (): React.ReactElement => {
  const { closeSnackBar } = useKleeenActions('ksNotifications');
  const { notifications } = useKleeenContext('ksNotifications');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const removeDisplayed = (id): void => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  const storeDisplayed = (id): void => {
    displayed = [...displayed, id];
  };

  useEffect(() => {
    notifications.forEach(({ key, message, options = {}, dismissed = false }: any) => {
      if (dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(key);
        return;
      }

      // do nothing if snackbar is already displayed
      if (displayed.includes(key)) return;

      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (event, myKey) => {
          // remove this snackbar from redux store
          closeSnackBar({ myKey });
          removeDisplayed(myKey);
        },
      });

      // keep track of snackbars that we've displayed
      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar]);

  return null;
};

export default KsNotifications;
