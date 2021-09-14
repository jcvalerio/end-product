import { ConfigDB } from './configure-db';
import { KapiCrud } from '../kapiCrud';
import { KapiDb } from '@kleeen/kleeen-api';
import db from './db-test/kapi.json';

describe('kapiCrud', () => {
  let configDB;
  const entityName = 'node';

  beforeEach(() => {
    configDB = new ConfigDB(db);
    KapiDb.init(configDB);
  });

  it(`add - ${entityName}`, () => {
    const addTesting = {
      displayValue: 'Bad - Testing',
      displayMedia: {
        type: 'text',
        value: '452220955-X',
      },
    };
    const [realisticFakeDataModel] = configDB.getDataNotId([KapiCrud.add(entityName, addTesting)]);
    expect(realisticFakeDataModel).toMatchSnapshot();
  });

  function report(name: string) {
    it(`list - ${name}`, () => {
      const realisticFakeDataModel = configDB.getDataNotId(KapiCrud.list(name));
      expect(realisticFakeDataModel).toMatchSnapshot();
    });

    it(`rawList - ${name}`, () => {
      const realisticFakeDataModel = configDB.getDataNotId(KapiCrud.rawList(name));
      expect(realisticFakeDataModel).toMatchSnapshot();
    });

    it(`getFilters - ${name}`, () => {
      const realisticFakeDataModel = configDB.getDataNotId(KapiCrud.getFilters([name]));
      expect(realisticFakeDataModel).toMatchSnapshot();
    });
  }

  db.collections.forEach((element) => report(element.name));
});
