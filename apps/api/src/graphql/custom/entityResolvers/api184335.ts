import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiTimestamp extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://put.your.api.here/';
    // You can access the token, data sources,
    // and the current user through 'this.context'.
  }

  willSendRequest(request: RequestOptions) {
    // Uncomment the following line to set a header token.
    // request.headers.set('Authorization', this.context.token);
    // Uncomment the following line to set params token.
    // request.params.set('api_key', this.context.token);
  }

  // Add Timestamp
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('timestamp', entity);

    // Sample HTTP POST request.
    // return this.post('timestamp', entity);
  }

  // Delete Timestamp
  async deleteEntity(id: string) {
    return KapiCrud.delete('timestamp', id);

    // Sample HTTP DELETE request.
    // return this.delete(`timestamp/${id}`);
  }

  // List Timestamp
  async listEntity(params: any) {
    return KapiCrud.list('timestamp', params);

    // Sample HTTP GET request.
    // return this.get('timestamp', params);
  }

  // Get Timestamp
  async getEntity(id: string) {
    return KapiCrud.get('timestamp', id);

    // Sample HTTP GET request.
    // return this.get(`timestamp/${id}`);
  }

  // Update Timestamp
  async updateEntity(entity) {
    return KapiCrud.update('timestamp', entity);

    // Sample HTTP PATCH request.
    // return this.patch(timestamp, entity);
  }

  // Auto complete for Timestamp
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('timestamp');
    // TODO: @guaria generate missing attributes
    return results.map((obj: { timestamp: { displayValue: string; value?: any } }) => ({ ...obj.timestamp }));
  }
}
