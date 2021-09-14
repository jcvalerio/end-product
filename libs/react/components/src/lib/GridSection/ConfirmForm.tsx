import './ConfirmForm.scss';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import { Localization } from './GridSection.model';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';

interface ConfirmFormProps {
  localization: Localization;
  onConfirm: () => void;
  onReject: () => void;
}

const ConfirmForm = (props: ConfirmFormProps) => {
  const {
    localization: { confirmArialLabel, rejectAriaLabel },
    onConfirm,
    onReject,
  } = props;
  return (
    <Toolbar className="confirm-form-container">
      <Tooltip title={confirmArialLabel}>
        <IconButton aria-label={confirmArialLabel} onClick={onConfirm} data-testid="confirm-delete-row">
          <CheckIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title={rejectAriaLabel}>
        <IconButton aria-label={rejectAriaLabel} onClick={onReject} data-testid="reject-delete-row">
          <ClearIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};
export default ConfirmForm;
