import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { usePrevious } from './usePrevious';
import { useRef } from 'react';

interface UseUrlQueryParams {
  extraParamsToInclude?: Record<string, any>;
  useNestedObjects?: boolean;
}

function useUrlQueryParams({ extraParamsToInclude, useNestedObjects }: UseUrlQueryParams = {}): {
  paramsBasedOnRoute: Record<string, any>;
  version: number;
} {
  const location = useLocation();
  const currentSearch = location.search;
  const previousSearch = usePrevious(location.search);
  const version = useRef(0);

  if (currentSearch !== previousSearch) {
    version.current += 1;
  }

  const paramsBasedOnRoute = queryString.parse(location.search, { parseBooleans: true });

  if (useNestedObjects) {
    const mapWithParsed = Object.keys(paramsBasedOnRoute).reduce(
      (acc, key) => ({
        ...acc,
        // URLs in detail pages have this shape: /profile?vehicle=12345
        // But any other page now filters in the following shape: /dashboard?vehicle={ in: [123, 456], min: 50 }
        // TODO we should change the shapeof the Details URL to something like: /profile/{ :id }? ...
        [key]: isValidJSONString(paramsBasedOnRoute[key])
          ? JSON.parse(paramsBasedOnRoute[key] as string)
          : paramsBasedOnRoute[key],
      }),
      {},
    );

    return { paramsBasedOnRoute: { ...mapWithParsed, ...extraParamsToInclude }, version: version.current };
  }

  return {
    paramsBasedOnRoute: {
      ...paramsBasedOnRoute,
      ...extraParamsToInclude,
    },
    version: version.current,
  };
}

export default useUrlQueryParams;

//#region Private Members
function isValidJSONString(str): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
//#endregion
