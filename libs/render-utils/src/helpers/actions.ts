import { ActionType } from '@kleeen/types';
import { propEq } from 'ramda';

export const isAddAction = propEq('type', ActionType.Add);
