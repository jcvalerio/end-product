import httpStatusCode from './httpStatusCodes';

function buildUrlQueryParams(params: { [key: string]: string }): string {
  return Object.getOwnPropertyNames(params)
    .map((key, i) => `${i === 0 ? '?' : ''}${key}=${params[key]}`)
    .join('&');
}

export const hasTrailingSlash = (pathname: string): boolean =>
  !!pathname && pathname.charAt(pathname.length - 1) === '/';

const removeTrailingSlash = (pathname: string): string =>
  hasTrailingSlash(pathname) ? pathname.slice(0, -1) : pathname;

const getFileExtension = (filename) => {
  const ext = /^.+\.([^.]+)$/.exec(filename);
  return ext == null ? '' : ext[1];
};

export { buildUrlQueryParams, httpStatusCode, removeTrailingSlash, getFileExtension };
