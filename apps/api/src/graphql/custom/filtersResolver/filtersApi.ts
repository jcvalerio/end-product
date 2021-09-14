import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

/* eslint @typescript-eslint/camelcase: 0, @typescript-eslint/no-unused-vars: 0 */
import { GetFiltersArgs } from '../../../types';

export class FiltersApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3030/';
  }

  willSendRequest(request: RequestOptions) {
    // // Use this line to set a header token.
    // request.headers.set('Authorization', this.context.token);
    // // Use this line to set a params token.
    // request.params.set('api_key', this.context.token);
  }

  async getFilters(args: GetFiltersArgs) {
    return 'not implemented';
  }
}
