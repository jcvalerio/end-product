/* eslint @typescript-eslint/camelcase: 0, @typescript-eslint/no-unused-vars: 0, max-lines: 0 */
import { RESTDataSource } from 'apollo-datasource-rest';
import { DataListingArgs, AuthContext } from '../../../types';
import { object_listing_4fcaa21d_c27c_4a13_9e11_fea63a72bcf7 } from '../../custom/widgetResolvers/object_listing_4fcaa21d_c27c_4a13_9e11_fea63a72bcf7';

// If you need to access the current user, the token and data sources,
// you can get them from 'this.context'
export class WidgetApi extends RESTDataSource {
  async object_listing_4fcaa21d_c27c_4a13_9e11_fea63a72bcf7(args: DataListingArgs) {
    return object_listing_4fcaa21d_c27c_4a13_9e11_fea63a72bcf7(args, this.context);
  }
}
