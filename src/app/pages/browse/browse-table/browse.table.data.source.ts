import { ServerDataSource } from 'ng2-smart-table';

export class BrowseTableDataSource extends ServerDataSource {
  find(element: any): Promise<any> {
    const found = this.data.find(el => el._id === element._id);

    if (found) {
      return Promise.resolve(found);
    }

    return Promise.reject(new Error('Element was not found in the dataset'));
  }
}
