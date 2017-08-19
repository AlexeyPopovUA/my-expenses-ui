import { Component } from '@angular/core';
import { MockServerResultsService } from './mock-server-results-service';
//import { PagedData } from './model/paged-data';
import { Payment } from './model/payment';
import { Page } from './model/page';

@Component({
  selector: 'nga-browse-table',
  providers: [
    MockServerResultsService
  ], // <!--(sort)="onSort($event)"-->
  template: `
    <ngx-datatable
      class="material"
      [rows]="rows"
      [columns]="columns"
      [columnMode]="'force'"
      [headerHeight]="50"
      [footerHeight]="50"
      [rowHeight]="'auto'"
      [externalPaging]="true"
      [count]="page.totalElements"
      [offset]="page.pageNumber"
      [limit]="page.size"
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
  page: Page = new Page();
  rows: Payment[] = [];

  constructor(private serverResultsService: MockServerResultsService) {
    this.page.pageNumber = 0;
    this.page.size = 50;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  /**
   * Populate the table with new data based on the page number
   * @param pageInfo
   */
  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.serverResultsService
      .getResults(this.page)
      .then(pagedData => {
        console.warn('result from subscribe', pagedData);
        this.page = pagedData.page;
        this.rows = pagedData.data;
      });
  }
}
