import {Component} from '@angular/core';

import {BrowseService} from './browse.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: "browse",
  templateUrl: './browse.html'
})
export class BrowseComponent {

  constructor(protected service: BrowseService) {
    this.service
      .getData()
      .then(data => {
        console.warn(data);
        this.source.load(data);
      })
      .catch(error => console.error(error));
  }

  source: LocalDataSource = new LocalDataSource();

  settings = {
    editable: false,
    columns: {
      name: {
        title: 'Name'
      },
      category: {
        title: 'Category'
      },
      date: {
        title: 'Date'
      },
      value: {
        title: 'Value'
      }
    }
  };
}
