import { createSlice } from '@reduxjs/toolkit';
import endUser from './models';

const entityName = 'endUser';

const endUserSlice = createSlice({
  name: entityName,
  ...endUser,
});

const actions = { key: entityName, actions: endUserSlice.actions };

export { actions };

export default endUserSlice.reducer;
