import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { WidgetErrorFallback } from '@kleeen/react/atomic-elements';

export const ErrorBoundaryComponent = ({ children }) => {
  const [errorInfo, setErrorInfo] = useState<{ componentStack: string }>(null);

  function onErrorHandler(error: Error, info: { componentStack: string }): void {
    console.error(error);
    console.info(info);
    setErrorInfo(info);
  }

  function fallbackComponent({ error }): JSX.Element {
    return <WidgetErrorFallback error={error} info={errorInfo} />;
  }
  return (
    <ErrorBoundary FallbackComponent={fallbackComponent} onError={onErrorHandler}>
      {children}
    </ErrorBoundary>
  );
};
