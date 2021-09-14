const endUser = {
  initialState: {
    currentUser: null,
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {
    addRequest: (state, action) => {
      state.isLoading = true;
    },
    addSuccess: (state, action) => {
      state.isLoading = false;
    },
    addFailure: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },

    getRequest: (state, action) => {
      state.isLoading = true;
    },
    getSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    getFailure: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },

    removeRequest: (state, action) => {
      state.isLoading = true;
    },
    removeSuccess: (state, action) => {
      state.isLoading = false;
    },
    removeFailure: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },

    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    logout: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    },
  },
};

export default endUser;
