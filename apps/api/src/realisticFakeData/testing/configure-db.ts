import Loki from 'lokijs';

export class ConfigDB extends Loki {
  addCollection;
  collections;

  constructor(db) {
    super();
    db.collections.forEach((element, index) => {
      this.addCollection(element.name);
      this.collections[index].data = element.data;
    });
  }

  getDataNotId(data: any[]) {
    if (!Array.isArray(data)) {
      return data;
    }

    return data.map((elements, idx) => {
      for (const obj in elements) {
        if (obj !== 'id') {
          if (elements[obj].id) {
            elements[obj].id = `${obj}-${idx}`;
          }
          if (elements[obj].created) {
            elements[obj].created = idx;
          }
        } else {
          elements[obj] = `${obj}-${idx}`;
        }
      }
      return elements;
    });
  }
}
