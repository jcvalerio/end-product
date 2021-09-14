import { ContextMenuSectionItem } from '../context-menu.model';
import { MenuGroupName } from '../contextual-menu.style';
import Tooltip from '@material-ui/core/Tooltip';

export interface ContextMenuSectionParams {
  children: React.ReactNode;
  section: ContextMenuSectionItem;
}

export function ContextMenuSection({ children, section }: ContextMenuSectionParams): JSX.Element {
  const { key, label } = section;
  return (
    <>
      <MenuGroupName key={key}>
        <Tooltip title={label} placement="top">
          <span className="menu-item-text">{label}</span>
        </Tooltip>
      </MenuGroupName>
      {children}
    </>
  );
}
