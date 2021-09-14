import { ExportConfig } from '@kleeen/types';
import { app } from '@kleeen/settings';

const globalName = 'KS';

export function globalVariable(name: string, object: unknown): void {
  const applyInfusion = isReactNativeInfusion();

  if (!applyInfusion) return;

  if (!window[globalName]) {
    window[globalName] = {};
  }

  window[globalName] = {
    ...window[globalName],
    [name]: object,
  };
}

export function isReactNativeInfusion(): boolean {
  const { exportConfig } = app;

  return exportConfig === ExportConfig.KleeenInfusion;
}
