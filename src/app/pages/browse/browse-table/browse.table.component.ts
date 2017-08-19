import {Component} from '@angular/core';
import {Http} from '@angular/http';

import {BrowseTableDataSource} from './browse.table.data.source';

@Component({
  selector: 'browse-table',
  template: `
    <ng2-smart-table
      [settings]="settings"
      [source]="source"
      (deleteConfirm)="onDeleteConfirm($event)"
    ></ng2-smart-table>
  `,
})
export class BrowseTableComponent {

  settings = {
    pager: {
      display: true,
      perPage: 50
    },
    columns: {
      name: {
        title: 'name',
        filter: false
      },
      category: {
        title: 'category',
        filter: false
      },
      date: {
        title: 'date',
        filter: false
      },
      value: {
        title: 'value',
        filter: false
      }
    }
  };

  source: BrowseTableDataSource;

  constructor(http: Http) {
    this.source = new BrowseTableDataSource(http, {
      endPoint: 'http://localhost:3000/payments/get',
      dataKey: 'items',
      pagerPageKey: 'page',
      pagerLimitKey: 'limit',
      totalKey: 'results',
      sortFieldKey: 'sort',
      sortDirKey: 'direction'
    });

    this.source.onUpdated().subscribe(value => {
      this.onEdited(value);
    });
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEdited(value) {
    console.warn('onEdited', value);
    //event.confirm.resolve();
    //return Promise.resolve(value);
  }
}
