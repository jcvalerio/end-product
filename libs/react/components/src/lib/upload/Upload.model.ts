import { BadgeProps as MuiBadgeProps } from '@material-ui/core/Badge';
import { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import { Translate } from '@kleeen/types';

export interface FileResult {
  filteredFiles: Array<File>;
  filteredFilesRead: Array<string>;
}
interface Localization {
  filesAllowed: string;
  uploadLabel: string;
}

interface UploadProps {
  allowedExtensions?: [];
  badgeConfig?: MuiBadgeProps;
  buttonConfig?: MuiButtonProps;
  fileExtensions?: string[];
  label?: string;
  multiple?: boolean;
  onChange: (result: FileResult) => void;
  translate?: Translate;
}

interface ButtonUploadProps {
  allowedExtensions?: [];
  badgeConfig?: MuiBadgeProps;
  badgeCounter?: number;
  buttonConfig?: MuiButtonProps;
  fileExtensions?: string[];
  label?: string;
  localization: Localization;
  multiple?: boolean;
  onChange: (result: FileResult) => void;
  shouldResetState?: boolean;
}

export { UploadProps, ButtonUploadProps };
