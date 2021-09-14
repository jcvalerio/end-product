import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { listingModalStyles as KsDialog } from './ListingModal.style';
import { Icon as KsIcon } from '../Icon';
import { ListingModalProps } from './ListingModal.model';
import { Loader } from '../Loader/Loader';
import { SimpleList } from '../simpleList/';
import { iconStyles } from './ListingModal.style';
import { parseAttributes } from '@kleeen/frontend/utils';
import { useTheme } from '@kleeen/react/hooks';

export function ListingModal({
  attribute,
  columnLabel,
  data,
  format,
  isOpen,
  onClose,
  rowDisplayValue,
  widgetId,
}: ListingModalProps) {
  const { themeClass } = useTheme();
  const iconClasses = iconStyles();

  function CloseButton() {
    return (
      <div className={iconClasses.iconFilter} onClick={handleClose}>
        <div className={iconClasses.iconWrapper}>
          <KsIcon icon="ks-close" />
        </div>
      </div>
    );
  }

  function handleClose(): void {
    onClose();
  }

  const parsedAttributes = parseAttributes([attribute], format);
  const parsedData = data.map((item) => ({ [attribute.name]: item }));

  return (
    <KsDialog aria-labelledby="form-dialog-title" className={themeClass} onClose={handleClose} open={isOpen}>
      <DialogTitle id="form-dialog-title">
        {`${rowDisplayValue ? rowDisplayValue + ' - | ' : ''}${columnLabel}`}
        <CloseButton />
      </DialogTitle>
      <DialogContent>
        {parsedData ? (
          <SimpleList
            data={parsedData}
            columns={parsedAttributes}
            listItemOptions={{ widgetId }}
          ></SimpleList>
        ) : (
          <Loader />
        )}
      </DialogContent>
    </KsDialog>
  );
}
