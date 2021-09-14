function generateDucks(ducks) {
  const epicsReducer = {};
  const sliceReducer = {};
  const actionsReducer = {};
  if (ducks) {
    Object.keys(ducks).forEach(function (key) {
      const { slice, epics, actions } = ducks[key];
      epicsReducer[key] = {
        ...Object.values({
          ...epics,
        }),
      };
      const { key: actionKey, actions: actionsFunctions } = actions;
      sliceReducer[actionKey] = slice;
      actionsReducer[actionKey] = actionsFunctions;
    });
  }
  return {
    epics: epicsReducer,
    slice: sliceReducer,
    actions: actionsReducer,
  };
}

function reduceEpics(ducks, accumulator = {}, prefix = '') {
  Object.keys(ducks).forEach(function (key) {
    const newKey = `${prefix}${key}`;
    const duck = ducks[key];
    if (typeof duck['default'] === 'function') {
      accumulator[newKey] = duck['default'];
    } else if (typeof duck === 'function') {
      accumulator[newKey] = duck;
    } else if (typeof duck === 'object') {
      reduceEpics(duck, accumulator, `${prefix}${key}_`);
    }
  });
  return accumulator;
}

function combineEpics(epics) {
  if (Object.keys(epics).length > 0) {
    return Object.values({
      ...epics,
    });
  }
  return epics;
}

export const generateStoreConfiguration = (generatedModules, customModules) => {
  const generatedDucks = generateDucks(generatedModules);
  const customDucks = generateDucks(customModules);

  const actions = {
    ...generatedDucks.actions,
    ...customDucks.actions,
  };

  const epics = combineEpics(
    reduceEpics({
      generated: generatedDucks.epics,
      custom: customDucks.epics,
    }),
  );

  const reducers = {
    ...generatedDucks.slice,
    ...customDucks.slice,
  };

  return { actions, epics, reducers };
};
