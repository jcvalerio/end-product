import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud } from '../../../realisticFakeData';

export class DepartmentApi extends RESTDataSource {
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

  async addDepartment(department: { [key: string]: unknown }) {
    return KapiCrud.add('department', department);

    // an example making an HTTP POST request.
    // return this.post('department', department);
  }

  async deleteDepartment(id: string) {
    return KapiCrud.delete('department', id);

    // an example making an HTTP DELETE request.
    // return this.delete(`department/${id}`);
  }

  async listDepartment(params: any) {
    return KapiCrud.list('department', params);

    // an example making an HTTP GET request.
    // return this.get('department', params);
  }

  async getDepartment(id: string) {
    return KapiCrud.get('department', id);

    // an example making an HTTP GET request.
    // return this.get(`department/${id}`);
  }

  async updateDepartment(department) {
    return KapiCrud.get('department', department);

    // an example making an HTTP PATH request.
    // return this.patch('department', department);
  }
}
