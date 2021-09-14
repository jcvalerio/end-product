import { useEffect } from 'react';

export const useGetWidgetsAmount = (setAmount: (n: number) => void): void => {
  useEffect(() => {
    if (setAmount) {
      const widgetCount = document.querySelectorAll('.card-section .card-widget').length;
      setAmount(widgetCount);
    }
  });
};
