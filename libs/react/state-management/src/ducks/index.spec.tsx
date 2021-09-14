import { generateStoreConfiguration } from './helpers';

describe(' ReactStateManagement', () => {
  it('should create an empty configuration', () => {
    const { epics, reducers, actions } = generateStoreConfiguration({}, {});
    expect(epics).toMatchObject({});
    expect(reducers).toMatchObject({});
    expect(actions).toMatchObject({});
  });
  it('should create an empty configuration is invoke with invalid parameters', () => {
    const { epics, reducers, actions } = generateStoreConfiguration(null, undefined);
    expect(epics).toMatchObject({});
    expect(reducers).toMatchObject({});
    expect(actions).toMatchObject({});
  });
});
