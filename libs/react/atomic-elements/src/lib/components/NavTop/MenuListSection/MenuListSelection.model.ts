import { MenuListProps } from '../../../../types';
import { PopperProps } from '@material-ui/core/Popper';
export interface MenuListSectionProps extends Partial<PopperProps> {
  menuList: MenuListProps[];
  productName: string;
  handleClose: (event: React.MouseEvent<EventTarget, globalThis.MouseEvent>) => void;
  navigate: (path: any, preserveQueryParams?: boolean) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
