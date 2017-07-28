import { Injectable } from '@angular/core';

@Injectable()
export class BrowseService {

  constructor() {
  }

  getData(): Promise<any> {
    return Promise.resolve([
      {
        name: 'name1',
        category: 'Food',
        date: (new Date()).toDateString(),
        value: 100
      }, {
        name: 'name1',
        category: 'Food',
        date: (new Date()).toDateString(),
        value: 100
      }
    ]);
  }
}
