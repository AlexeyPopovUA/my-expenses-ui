import {Component} from '@angular/core';
import {Http} from '@angular/http';

import {ServerDataSource} from 'ng2-smart-table';

@Component({
  selector: 'browse-table',
  template: `
    <ng2-smart-table [settings]="settings" [source]="source"></ng2-smart-table>
  `,
})
export class BrowseTableComponent {

  settings = {
    columns: {
      id: {
        title: 'ID',
      },
      albumId: {
        title: 'Album',
      },
      title: {
        title: 'Title',
      },
      url: {
        title: 'Url',
      },
    },
  };

  source: ServerDataSource;

  constructor(http: Http) {
    console.warn("constructor");
    this.source = new ServerDataSource(http, {endPoint: 'https://jsonplaceholder.typicode.com/photos'});
  }
}
