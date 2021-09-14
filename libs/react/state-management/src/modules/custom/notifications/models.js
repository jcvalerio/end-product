const ksNotifications = {
  initialState: {
    notifications: [],
  },
  reducers: {
    addNotification: (state, action) => {
      const { payload } = action;
      state.notifications = [
        ...state.notifications,
        {
          key: payload.key,
          ...payload.notification,
        },
      ];
    },

    closeSnackBar: (state, action) => {
      const { payload } = action;
      state.notifications = state.notifications.map((notification) =>
        payload.dismissAll || notification.key === payload.key
          ? { ...notification, dismissed: true }
          : { ...notification },
      );
    },
  },
};

export default ksNotifications;
