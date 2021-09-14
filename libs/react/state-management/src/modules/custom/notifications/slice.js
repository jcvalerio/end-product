import { createSlice } from '@reduxjs/toolkit';
import ksNotifications from './models';

const entityName = 'ksNotifications';

const ksNotificationsSlice = createSlice({
  name: entityName,
  ...ksNotifications,
});

const actions = { key: entityName, actions: ksNotificationsSlice.actions };

export { actions };

export default ksNotificationsSlice.reducer;
