import { Component } from '@angular/core';
import { MockServerResultsService } from './mock-server-results-service';
import { Payment } from './model/payment';
import { Page } from './model/page';
import { Sorting } from './model/sorting';

@Component({
  selector: 'nga-browse-table',
  providers: [
    MockServerResultsService
  ], // <!--(sort)="onSort($event)"-->
  template: `
    <ngx-datatable
      class="material"
      [rows]="data"
      [columns]="columns"
      [columnMode]="'force'"
      [headerHeight]="50"
      [footerHeight]="50"
      [rowHeight]="'auto'"
      [externalPaging]="true"
      [count]="paging.totalElements"
      [offset]="paging.pageNumber"
      [limit]="paging.size"
      (page)='setPage($event)'
    ></ngx-datatable>`
})
export class BrowseTableComponent {

  columns = [
    { name: 'Name', prop: 'name' },
    { name: 'Category', prop: 'category' },
    { name: 'Date', prop: 'date' },
    { name: 'Value', prop: 'value' }
  ];

  paging: Page = new Page();
  sorting: Sorting = new Sorting('date');
  data: Payment[] = [];

  constructor(private serverResultsService: MockServerResultsService) {
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  /**
   * Populate the table with new data based on the paging number
   * @param pageInfo
   */
  setPage(pageInfo) {
    console.warn('setPage', pageInfo);
    this.paging.pageNumber = pageInfo.offset;
    this.serverResultsService
      .getResults(this.paging, this.sorting)
      .then(data => {
        console.warn('result from subscribe', data);
        this.data = data;
      });
  }
}
