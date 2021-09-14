import { createSlice } from '@reduxjs/toolkit';
import endUserPreferences from './models';

const entityName = 'endUserPreferences';
const endUserPreferencesSlice = createSlice({
  name: entityName,
  ...endUserPreferences,
});

const actions = { key: entityName, actions: endUserPreferencesSlice.actions };

export { actions };

export default endUserPreferencesSlice.reducer;
