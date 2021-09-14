/* eslint @typescript-eslint/camelcase: 0, @typescript-eslint/no-unused-vars: 0 */
import { DataListingArgs } from '../../../types';
import { DataSource } from 'apollo-datasource';
import { getListingData } from '../../../realisticFakeData';

export class WidgetFakeApi extends DataSource {
  async object_listing_4fcaa21d_c27c_4a13_9e11_fea63a72bcf7(args: DataListingArgs) {
    return getListingData(args);
  }
}
