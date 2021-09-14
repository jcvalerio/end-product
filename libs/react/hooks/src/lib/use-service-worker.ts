import { SnackbarMessage, useSnackbar } from 'notistack';

import { Workbox } from 'workbox-window';
import { WorkboxLifecycleWaitingEvent } from 'workbox-window/utils/WorkboxEvent';
import { useEffect } from 'react';

const tabOutdatedMessage = {
  message: 'A newer version is available in another tab, please close this tab.',
  title: 'Tab outdated',
};

export function useServiceWorker() {
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    registerServiceWorker();
  });

  /**
   * Register Workbox Service Worker
   */
  function registerServiceWorker(): void {
    if ('serviceWorker' in navigator) {
      (async () => {
        const wb = new Workbox('/sw.js');

        /**
         * Handlers
         */

        function showWaitingPrompt(): void {
          enqueueSnackbar(
            {
              action: { title: 'Refresh', onClick: updateServiceWorker },
              message: 'A newer version is available, click "Refresh" to update now. ',
              title: 'New version available',
            },
            {
              persist: true,
              variant: 'info',
            },
          );

          function updateServiceWorker(): void {
            wb.addEventListener('controlling', function () {
              window.location.reload();
            });

            // Send a message to the waiting service worker instructing it to activate
            wb.messageSkipWaiting();
          }
        }

        function showExternalWaitingNotification(event: WorkboxLifecycleWaitingEvent): void {
          const { isExternal } = event;

          if (isExternal) {
            enqueueSnackbar(tabOutdatedMessage as SnackbarMessage, {
              persist: true,
              variant: 'warning',
            });
          } else {
            showWaitingPrompt();
          }
        }

        function showExternalActivatedNotification({ isExternal }: WorkboxLifecycleWaitingEvent): void {
          closeSnackbar();

          if (isExternal) {
            enqueueSnackbar(tabOutdatedMessage as SnackbarMessage, {
              persist: true,
              variant: 'error',
            });
          }
        }

        // Waiting event
        wb.addEventListener('waiting', showExternalWaitingNotification);

        // Activated event
        wb.addEventListener('activated', showExternalActivatedNotification);

        try {
          await wb.register();
        } catch (error) {
          console.warn(error);
        }
      })();
    }
  }
}
