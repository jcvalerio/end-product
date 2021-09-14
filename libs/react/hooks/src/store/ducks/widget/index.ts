import { initialState as WidgetInitialState, model } from './model';

import { createSlice } from '@reduxjs/toolkit';
import { generateEpics } from './epics';

export function generateStoreSlice(sliceName: string): any {
  const taskSlice = createSlice({
    name: sliceName,
    ...model,
  });

  const epics = generateEpics(taskSlice.actions as any);
  const actions = { key: sliceName, actions: taskSlice.actions };
  return { actions, epics, slice: taskSlice };
}

export { WidgetInitialState };
