import { StorageHelper } from '@aws-amplify/core';

export const useLocalStorage = (key: string, defaultValue: any) => {
  const _storage = new StorageHelper().getStorage();
  let localStorageValue;
  try {
    localStorageValue = JSON.parse(_storage.getItem(key) || JSON.stringify(defaultValue));
  } catch (e) {
    localStorageValue = defaultValue;
  }

  const setLocalStorageValue = (value) => {
    if (key) {
      _storage.setItem(key, JSON.stringify(value));
    }
  };

  const removeLocalStorageValue = () => {
    _storage.removeItem(key);
  };

  return { localStorageValue, setLocalStorageValue, removeLocalStorageValue };
};
