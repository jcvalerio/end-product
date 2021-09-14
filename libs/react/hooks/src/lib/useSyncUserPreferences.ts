import { useEffect, useState } from 'react';

import { useKleeenContext } from './useKleeenContext';
import { useLocalization } from './useLocalization';
import { useTheme } from './useTheme';

interface Props {
  locale: string;
  showOnboardingPage: boolean;
  themeKit: string;
}

function useSyncUserPreferences(): [Props] {
  const { currentUser } = useKleeenContext('endUser');
  const { currentUserPreferences, error, isLoading } = useKleeenContext('endUserPreferences');
  const { language, setLanguage } = useLocalization();
  const [showOnboardingPage, setShowOnboardingPage] = useState<boolean>(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const hasEndUserPreferences = currentUser && currentUserPreferences && !isLoading && !error;
    if (hasEndUserPreferences) {
      if (currentUserPreferences.locale) {
        setLanguage(currentUserPreferences.locale);
      }

      if (currentUserPreferences.theme) {
        setTheme({
          ...theme,
          kit: currentUserPreferences.themeKit,
        });
      }
    }
    if (currentUser) {
      if (Object.prototype.hasOwnProperty.call(currentUser?.userPreference || {}, 'showOnboardingPage')) {
        setShowOnboardingPage(currentUser.userPreference.showOnboardingPage);
      } else {
        setShowOnboardingPage(true);
      }
    }
  }, [currentUser]);

  return [
    {
      themeKit: theme.kit,
      locale: language,
      showOnboardingPage,
    },
  ];
}

export default useSyncUserPreferences;
