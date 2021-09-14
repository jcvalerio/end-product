import {
  DismissOnboardingProps,
  InvokeHandleDismissProps,
} from '../../../generated/components/on-boarding/on-boarding.model';
import { useEffect } from 'react';
import { useKleeenActions, useKleeenContext } from '@kleeen/react/hooks';

import { isNilOrEmpty } from '@kleeen/common/utils';

interface OnboardingProps {
  content: string;
  setInvokeHandleDismiss: InvokeHandleDismissProps;
  setIsContinueBtnDisabled: (isContinueBtnDisabled: boolean) => void;
}

export function Onboarding({
  content = 'Implement the custom widget for the onboarding process here.',
  setInvokeHandleDismiss,
  setIsContinueBtnDisabled,
}: OnboardingProps): JSX.Element {
  const endUserActions = useKleeenActions('endUser');
  const { currentUser } = useKleeenContext('endUser');

  useEffect(() => {
    if (isNilOrEmpty(currentUser)) {
      setIsContinueBtnDisabled(true);
      return;
    }
    setIsContinueBtnDisabled(false);

    function myOwnCustomHandleDismiss(handleDismiss: DismissOnboardingProps): void {
      // customer business implementation

      // replace or modify the following code if you need it
      const userPreference = Object.assign({}, currentUser?.userPreference, {
        showOnboardingPage: false,
      });
      endUserActions.setCurrentUser({
        ...currentUser,
        userPreference,
      });

      if (handleDismiss) {
        handleDismiss();
      }
    }
    setInvokeHandleDismiss((): InvokeHandleDismissProps => myOwnCustomHandleDismiss);
  }, [currentUser, endUserActions, setIsContinueBtnDisabled, setInvokeHandleDismiss]);

  if (isNilOrEmpty(currentUser)) {
    return null;
  }
  if (!currentUser.showOnboardingPage) {
    return null;
  }

  return <div>{content}</div>;
}
