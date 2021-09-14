/* eslint @typescript-eslint/camelcase: 0, @typescript-eslint/no-unused-vars: 0 */
import {
  AccessControlCheckArgs,
  AccessControlCheckResults,
  FormatCheckArgs,
  FormatCheckResults,
} from '../../../types';
import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export class FormatCheckApi extends RESTDataSource {
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

  async formatCheck(args: FormatCheckArgs): Promise<FormatCheckResults | 'not implemented'> {
    return 'not implemented';
  }

  async accessControlCheck(
    args: AccessControlCheckArgs,
  ): Promise<AccessControlCheckResults | 'not implemented'> {
    return 'not implemented';
  }
}
