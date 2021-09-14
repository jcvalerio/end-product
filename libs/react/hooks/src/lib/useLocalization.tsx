import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

import { useLocalStorage } from './useLocalStorage';
import useUserInfo from './useUserInfo';

interface LocalizationContextProps {
  language: Language;
  setLanguage: Dispatch<SetStateAction<string>>;
  getLanguagePreferencesStoreKey: (string) => string;
}

export enum Language {
  en = 'en',
  es = 'es',
}

const defaultLanguage = Language.en;

export const LocalizationContext = React.createContext<LocalizationContextProps>({
  language: defaultLanguage,
  setLanguage: (language: string): string => {
    return language;
  },
  getLanguagePreferencesStoreKey,
});

export function useLocalization(): LocalizationContextProps {
  const themeContext = useContext(LocalizationContext);

  return themeContext;
}

function getLanguagePreferencesStoreKey(userName: string): string | null {
  return userName ? `user-preferences-language-${userName}` : null;
}

export const LocalizationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const _user = useUserInfo();
  const userName = _user?.userInfo?.username;

  const keyOfLanguageLocalStorage = getLanguagePreferencesStoreKey(userName);
  const { localStorageValue: storedLanguage, setLocalStorageValue } = useLocalStorage(
    keyOfLanguageLocalStorage,
    defaultLanguage,
  );

  const onSetLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setLocalStorageValue(newLanguage);
  };

  useEffect(() => {
    if (language !== storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, [storedLanguage]);

  return (
    <LocalizationContext.Provider
      value={{
        language,
        setLanguage: onSetLanguage,
        getLanguagePreferencesStoreKey,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};
