/* eslint @typescript-eslint/camelcase: 0, @typescript-eslint/no-unused-vars: 0 */
import {
  AccessControlCheckArgs,
  AccessControlCheckResults,
  AccessLevel,
  FormatCheckArgs,
  FormatCheckResults,
} from '../../../types';

import { RESTDataSource } from 'apollo-datasource-rest';

export class FormatCheckFakeApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3030/';
  }

  async formatCheck(args: FormatCheckArgs): Promise<FormatCheckResults> {
    return { isValid: true };
  }

  async accessControlCheck(args: AccessControlCheckArgs): Promise<AccessControlCheckResults> {
    return { accessLevel: AccessLevel.SHOW };
  }
}
