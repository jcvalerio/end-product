const endUserPreferences = {
  initialState: {
    currentUserPreferences: null,
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {
    // CUSTOM
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    createEndUserPreferences: (state, action) => {
      state.isLoading = true;
    },

    saveEndUserPreferences: (state, action) => {
      state.isLoading = true;
    },
    saveEndUserPreferencesSuccess: (state, action) => {
      state.isLoading = false;
      const { payload } = action;
      state.currentUserPreferences = payload;
    },
    saveEndUserPreferencesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    getEndUserPreferences: (state, action) => {
      state.isLoading = true;
    },
    getEndUserPreferencesSuccess: (state, action) => {
      state.isLoading = false;
      const { payload } = action;
      state.currentUserPreferences = payload;
    },
    getEndUserPreferencesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    getRequest: (state, action) => {
      state.isLoading = true;
    },
  },
};

export default endUserPreferences;
