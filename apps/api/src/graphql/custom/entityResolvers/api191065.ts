import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiExpense extends RESTDataSource {
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

  // Add Expense
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('expense', entity);

    // Sample HTTP POST request.
    // return this.post('expense', entity);
  }

  // Delete Expense
  async deleteEntity(id: string) {
    return KapiCrud.delete('expense', id);

    // Sample HTTP DELETE request.
    // return this.delete(`expense/${id}`);
  }

  // List Expense
  async listEntity(params: any) {
    return KapiCrud.list('expense', params);

    // Sample HTTP GET request.
    // return this.get('expense', params);
  }

  // Get Expense
  async getEntity(id: string) {
    return KapiCrud.get('expense', id);

    // Sample HTTP GET request.
    // return this.get(`expense/${id}`);
  }

  // Update Expense
  async updateEntity(entity) {
    return KapiCrud.update('expense', entity);

    // Sample HTTP PATCH request.
    // return this.patch(expense, entity);
  }

  // Auto complete for Expense
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('expense');
    // TODO: @guaria generate missing attributes
    return results.map((obj: { expense: { displayValue: string; value?: any } }) => ({ ...obj.expense }));
  }
}
