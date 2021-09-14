import { propOr } from 'ramda';

export const isSuccess = propOr(true, 'success');
