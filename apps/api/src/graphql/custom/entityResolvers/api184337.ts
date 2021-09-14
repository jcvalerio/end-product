import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiCompany extends RESTDataSource {
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

  // Add Company
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('company', entity);

    // Sample HTTP POST request.
    // return this.post('company', entity);
  }

  // Delete Company
  async deleteEntity(id: string) {
    return KapiCrud.delete('company', id);

    // Sample HTTP DELETE request.
    // return this.delete(`company/${id}`);
  }

  // List Company
  async listEntity(params: any) {
    return KapiCrud.list('company', params);

    // Sample HTTP GET request.
    // return this.get('company', params);
  }

  // Get Company
  async getEntity(id: string) {
    return KapiCrud.get('company', id);

    // Sample HTTP GET request.
    // return this.get(`company/${id}`);
  }

  // Update Company
  async updateEntity(entity) {
    return KapiCrud.update('company', entity);

    // Sample HTTP PATCH request.
    // return this.patch(company, entity);
  }

  // Auto complete for Company
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('company');
    // TODO: @guaria generate missing attributes
    return results.map((obj: { company: { displayValue: string; value?: any } }) => ({ ...obj.company }));
  }
}
