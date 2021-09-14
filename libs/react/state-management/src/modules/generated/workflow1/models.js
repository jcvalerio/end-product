const task = {
  initialState: {
    entity: {},
    error: null,
    isLoading: false,
    status: { version: 0 },
    widgets: {},
  },
  reducers: {
    addRequest: (state) => {
      state.isLoading = true;
    },
    addSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.status.version += 1;
    },
    addFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    bulkAddRequest: (state) => {
      state.isLoading = true;
    },
    addWidget: (state, action) => {
      if (!state.widgets[action.payload.widgetId]) {
        state.widgets[action.payload.widgetId] = {
          autoCompleteValues: {
            isLoading: false,
            data: [],
            error: null,
          },
          isLoading: false,
          data: [],
          error: null,
        };
      }

      const widget = state.widgets[action.payload.widgetId];
      widget.isLoading = false;
      widget.data = [];
      widget.error = null;
    },
    clearEntity: (state) => {
      state.entity = {};
    },
    deleteRequest: (state) => {
      state.isLoading = true;
    },
    deleteSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.status.version += 1;
    },
    deleteFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    bulkDeleteRequest: (state) => {
      state.isLoading = true;
    },
    safeDeleteRequest: (state) => {
      state.isLoading = true;
    },
    safeDeleteSuccess: (state) => {
      state.isLoading = false;
    },
    safeDeleteFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    dispatchCustomAction: (state, action) => {
      if (!state.widgets[action.payload.widgetId]) {
        console.error('Invalid state', action.payload);
        return state;
      }

      const widget = state.widgets[action.payload.widgetId];
      widget.isLoading = true;
    },
    dispatchCustomActionSuccess: (state, action) => {
      if (!state.widgets[action.payload.widgetId]) {
        console.error('Invalid state', action.payload);
        return state;
      }

      const widget = state.widgets[action.payload.widgetId];
      widget.data = action.payload.response;
      widget.isLoading = false;
    },
    dispatchCustomActionFailure: (state, action) => {
      if (!state.widgets[action.payload.widgetId]) {
        console.error('Invalid state', action.payload);
        return state;
      }

      const widget = state.widgets[action.payload.widgetId];
      widget.error = action.payload.response;
      widget.data = [];
      widget.isLoading = false;
    },
    getRequest: (state) => {
      state.isLoading = true;
    },
    getSuccess: (state, action) => {
      state.entity = Object.values(action.payload.data).reduce((acc, value) => {
        if (value && value.data) {
          acc = value.data;
        }

        return acc;
      }, {});
      state.isLoading = false;
    },
    getFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    getAutoCompleteValues: (state, action) => {
      if (!state.widgets[action.payload.widgetId]) {
        state.widgets[action.payload.widgetId] = {
          autoCompleteValues: {
            isLoading: false,
            data: [],
            error: null,
          },
          isLoading: false,
          data: [],
          error: null,
        };
      }

      const widget = state.widgets[action.payload.widgetId];
      widget.autoCompleteValues.isLoading = true;
      widget.autoCompleteValues.error = null;
    },
    getAutoCompleteValuesSuccess: (state, action) => {
      if (!state.widgets[action.payload.widgetId]) {
        console.error('Invalid state', action.payload);
        return state;
      }

      const widget = state.widgets[action.payload.widgetId];
      widget.autoCompleteValues.isLoading = false;
      widget.autoCompleteValues.data = action.payload.data;
    },
    getAutoCompleteValuesFailure: (state, action) => {
      if (!state.widgets[action.payload.widgetId]) {
        console.error('Invalid state', action.payload);
        return state;
      }

      const widget = state.widgets[action.payload.widgetId];
      widget.autoCompleteValues.isLoading = false;
      widget.autoCompleteValues.data = [];
      widget.autoCompleteValues.error = action.payload;
    },
    getData: (state, action) => {
      if (!state.widgets[action.payload.widgetId]) {
        state.widgets[action.payload.widgetId] = {
          autoCompleteValues: {
            isLoading: false,
            data: [],
            error: null,
          },
          isLoading: false,
          data: [],
          error: null,
        };
      }

      const widget = state.widgets[action.payload.widgetId];
      widget.isLoading = true;
      widget.error = null;
    },
    getDataSuccess: (state, action) => {
      if (!state.widgets[action.payload.widgetId]) {
        console.error('Invalid state', action.payload);
        return state;
      }

      const widget = state.widgets[action.payload.widgetId];
      widget.isLoading = false;
      widget.data = action.payload.response;
    },
    getDataFailure: (state, action) => {
      if (!state.widgets[action.payload.widgetId]) {
        console.error('Invalid state', action.payload);
        return state;
      }

      const widget = state.widgets[action.payload.widgetId];
      widget.isLoading = false;
      widget.data = [];
      widget.error = action.payload.response;
    },
    refreshPage: (state) => {
      state.status.version += 1;
    },
    updateRequest: (state) => {
      state.isLoading = true;
    },
    updateSuccess: (state) => {
      state.isLoading = false;
      state.status.version += 1;
    },
    updateFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    bulkUpdateRequest: (state) => {
      state.isLoading = true;
    },
  },
};

export default task;
