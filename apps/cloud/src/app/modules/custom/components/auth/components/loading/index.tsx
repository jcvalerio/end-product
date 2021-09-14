import './loading.scss';

import { IAuthPieceProps } from 'aws-amplify-react/lib-esm/Auth/AuthPiece';
import { Loading } from 'aws-amplify-react';
import classNames from 'classnames';

class CustomLoading extends Loading {
  constructor(props: IAuthPieceProps) {
    super(props);
    this._validAuthStates = ['loading'];
  }

  showComponent(): JSX.Element {
    return <KSLoading />;
  }
}

export function KSLoading(): JSX.Element {
  const bem = 'ks-loading';

  return (
    <div className={classNames(bem, 'loading')}>
      <div className={classNames(`${bem}__container`, 'container')}>
        <div className={classNames(`${bem}__wrapper`, 'wrap')}>
          <div className={classNames(`${bem}__logo-container`, 'pic')}>
            <img className={classNames(`${bem}__logo`)} src="/assets/logo.png" alt="KS Logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomLoading;
