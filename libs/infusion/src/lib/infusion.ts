import { KSAuth } from '@kleeen/auth';

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ks-workflow')
export class KSWorkflow extends LitElement {
  @property()
  ksRootId = 'ks-root';

  @property()
  route = '';

  firstUpdated() {
    const documentElement = this.renderRoot.querySelector(`#${this.ksRootId}`);

    window['KS']?.initApp(documentElement);

    window['KS']?.navigate({
      pathname: this.route || window.location.pathname,
      search: window.location.search,
    });
  }

  render() {
    return html`<div id="${this.ksRootId}" style="height:100%; width:100%"></div>`;
  }

  protected createRenderRoot() {
    return this;
  }
}

@customElement('ks-login')
export class KSLogin extends LitElement {
  @property()
  KSAuth = KSAuth;

  render() {
    return '';
  }

  protected createRenderRoot() {
    return this;
  }
}
