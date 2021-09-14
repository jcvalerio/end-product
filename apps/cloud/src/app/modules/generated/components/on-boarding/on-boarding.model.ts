export interface OnBoardingSettings {
  isCustomWidget: boolean;
  isEnable: boolean;
  title: string;
  titleDescription?: string;
  widgetContent?: string;
}

export interface OnBoardingProps {
  translate: (key: string) => string;
}

export type DismissOnboardingProps = () => void;

export type InvokeHandleDismissProps = (dismissOnboarding: DismissOnboardingProps) => void;
