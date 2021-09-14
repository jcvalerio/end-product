export type TextOrElement = JSX.Element | string;

export interface KsTrouserProps {
  children: TextOrElement;
  handleClose: () => void;
  open: boolean;
  showMessageArea?: boolean;
  title: TextOrElement;
}
