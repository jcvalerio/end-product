import { AmendCellUpdate, Attribute, Cell, Translate } from '@kleeen/types';
import { EditingCell } from '../GridSection.model';

export interface CellInputProps {
  amendCellUpdate: AmendCellUpdate;
  attr: Attribute;
  autocomplete: any;
  cell: Cell | Cell[];
  editingCell: EditingCell;
  setEditingCell: React.Dispatch<React.SetStateAction<{}>>;
  row: any; // TODO add row types everywhere
  rowDisplayValue: string | number | boolean;
  translate?: Translate;
}
