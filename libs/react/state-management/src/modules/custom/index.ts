import * as endUser from './endUser';
import * as endUserPreferences from './endUserPreferences';
import * as ksNotifications from './notifications';

export default {
  ...Object.values({
    endUser,
    endUserPreferences,
    ksNotifications,
  }),
};
