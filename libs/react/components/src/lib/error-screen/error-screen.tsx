import { ErrorScreenProps } from './error-screen.model';

export function KsErrorScreen({
  containerClassName = '',
  text,
  textClassName = '',
  textStyle = {},
}: ErrorScreenProps) {
  return (
    <div
      className={containerClassName}
      style={{ display: 'flex', height: '100%', textAlign: 'center', width: '100%' }}
    >
      <h1 className={textClassName} style={textStyle}>
        {text}
      </h1>
    </div>
  );
}
