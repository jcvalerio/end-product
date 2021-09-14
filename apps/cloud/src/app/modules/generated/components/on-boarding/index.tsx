import { DismissOnboardingProps, InvokeHandleDismissProps, OnBoardingProps } from './on-boarding.model';
import { PageIntroSection, SnackBarSection } from '@kleeen/react/atomic-elements';
import React, { ReactElement, useEffect, useState } from 'react';
import { useKleeenActions, useKleeenContext } from '@kleeen/react/hooks';

import { KSAuth } from '@kleeen/auth';
import { KUIConnect } from '@kleeen/core-react';
import { Onboarding } from '../../../custom/components';
import ReactMarkdown from 'react-markdown';
import { Settings } from './on-boarding.settings';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useHistory } from 'react-router-dom';
import { useStyles } from './on-boarding.styles';

const OnBoardingView = ({ translate, ...props }: OnBoardingProps): ReactElement => {
  const history = useHistory();
  const endUserActions = useKleeenActions('endUser');
  const { currentUser } = useKleeenContext('endUser');
  const [isContinueBtnDisabled, setIsContinueBtnDisabled] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const { isCustomWidget, titleDescription, widgetContent, title } = Settings;
  const classes = useStyles();

  function onDismissOnboarding(): void {
    if (history) {
      history.push('/');
    }
  }

  const [invokeHandleDismiss, setInvokeHandleDismiss] = useState<InvokeHandleDismissProps>(() => null);

  useEffect(() => {
    function kleeenDefaultImplementation(dismissOnboarding: DismissOnboardingProps): void {
      if (currentUser) {
        const userPreference = Object.assign({}, currentUser?.userPreference, {
          showOnboardingPage: false,
        });
        endUserActions.setCurrentUser({
          ...currentUser,
          userPreference,
        });

        if (dismissOnboarding) {
          dismissOnboarding();
        }
      }
    }
    if (!isNilOrEmpty(currentUser)) {
      setInvokeHandleDismiss(() => kleeenDefaultImplementation);
      setIsReady(true);
    }
  }, [currentUser, endUserActions]);

  async function handleCancel(): Promise<unknown> {
    if (endUserActions && history) {
      endUserActions.logout();
      history.push('/');
    }
    return KSAuth.signOut().catch(console.warn);
  }

  if (!isReady) {
    return null;
  }

  return (
    <div className={classes.onBoardingTask}>
      <div className={classes.onBoardingPageIntro}>
        <PageIntroSection
          actions={[]}
          attributes={[]}
          description={titleDescription}
          entity=""
          showActions={false}
          showAvatar={false}
          showDesc={true}
          showTitle={true}
          title={title}
        />
      </div>
      <div className={classes.onBoardingGridSection}>
        {isCustomWidget ? (
          <Onboarding
            content={widgetContent}
            setInvokeHandleDismiss={setInvokeHandleDismiss}
            setIsContinueBtnDisabled={setIsContinueBtnDisabled}
          />
        ) : (
          <ReactMarkdown className={classes.preview}>{widgetContent}</ReactMarkdown>
        )}
      </div>
      <SnackBarSection
        actions={[
          { type: 'CUSTOM', label: translate('app.onboarding.cancelAndLogout'), func: handleCancel },
          {
            type: 'CUSTOM',
            label: translate('app.onboarding.dismissAndContinue'),
            func: () => {
              invokeHandleDismiss(onDismissOnboarding);
            },
            disabled: isContinueBtnDisabled,
          },
        ]}
        entity=""
        entityActions={{}}
        selectedRows={[]}
        setSelectedRows={[]}
        showSelectAndExecute={false}
        showSnackBar={true}
      ></SnackBarSection>
    </div>
  );
};

export const OnBoardingTask = KUIConnect(({ translate }) => ({ translate }))(OnBoardingView);

export const IsOnboardingEnable = (Settings || false) && Settings.isEnable;
