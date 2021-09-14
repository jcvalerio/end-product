import './CardTitle.scss';

import { CardTitleProps } from '../../CardWidget.model';
import classnames from 'classnames';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const bem = 'ks-card-title';

export const CardTitle = ({ title, icon }: CardTitleProps): JSX.Element =>
  typeof title === 'string' ? (
    <div className={classnames(bem, 'cardTitle')}>
      <h3 className={classnames(`${bem}__value`, 'title')}>{title}</h3>
      {icon && <MoreHorizIcon className={classnames(`${bem}__icon`, 'icon')} />}
    </div>
  ) : (
    title ?? null
  );
