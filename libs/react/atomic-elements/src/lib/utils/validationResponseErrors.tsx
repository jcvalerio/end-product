import { isNilOrEmpty } from '@kleeen/common/utils';

export const getValidationResponseErrors = (response, className): JSX.Element => {
  if (!isNilOrEmpty(response.isValid) && !response.isValid) {
    return (
      <ul className={className}>
        {response.errors.map((error, i) => {
          return <li>{error.message}</li>;
        })}
      </ul>
    );
  }
};
