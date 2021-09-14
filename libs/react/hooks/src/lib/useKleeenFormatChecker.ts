import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { useEffect, useState } from 'react';

import { BaseApiService } from '@kleeen/frontend/utils';
import { Subject } from 'rxjs';

interface Validation {
  isValid: boolean;
  errors?: { message: string }[];
}

export const useKleeenFormatChecker = ({
  taskName,
  widgetId,
  formField,
}): [{ validateFormField: (term: string) => void; resetValidationResponse: () => void }, Validation] => {
  const [subject, setSubject] = useState(null);
  const [validationResponse, setValidationResponse] = useState<Validation>({ isValid: null, errors: null });

  const resetValidationResponse = () => {
    setValidationResponse({ isValid: null, errors: null });
  };

  const validateFormField = (formValue: string) => {
    if (subject) subject.next(formValue);
  };

  useEffect(() => {
    if (subject === null) {
      const sub = new Subject();
      setSubject(sub);
    } else {
      const observable = subject
        .pipe(
          map((formValue: string | number) => formValue.toString()),
          map((formValue: string) => formValue.trim()),
          distinctUntilChanged(),
          debounceTime(200),
          switchMap((formValue: string) =>
            BaseApiService.graphqlFormatCheck({ taskName, widgetId, formField, formValue }).pipe(
              map((request) => request.response),
              catchError(BaseApiService.getErrorHandler(`useKleeenFormatChecker`, 'formatCheck')),
            ),
          ),
        )
        .subscribe(
          (res) => setValidationResponse(res.data.formatCheck),
          (err) => console.error('err >> ', err),
        );

      return () => {
        observable.unsubscribe();
        subject.unsubscribe();
      };
    }
  }, [subject]);

  return [{ validateFormField, resetValidationResponse }, validationResponse];
};
