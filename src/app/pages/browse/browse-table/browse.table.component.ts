import { Component } from '@angular/core';
import { MockServerResultsService } from './mock-server-results-service';
import { Payment } from './model/payment';
import { Page } from './model/page';
import { Sorting } from './model/sorting';
import { Direction } from './model/direction';

@Component({
  selector: 'nga-browse-table',
  providers: [
    MockServerResultsService
  ],
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
      (sort)="onSort($event)"
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
    return this.updatePageData();
  }

  /**
   * Populate the table with new data based on the paging number
   * @param pageInfo
   */
  setPage(pageInfo) {
    this.paging.pageNumber = pageInfo.offset;

    this.updatePageData()
      .then(data => {
        console.warn('result from paging', data);
      });
  }

  onSort(sortInfo) {
    console.warn('onSort', sortInfo);
    const sorter = sortInfo.sorts[0];
    this.sorting.field = sorter.prop;
    this.sorting.direction = sorter.dir === 'asc' ? Direction.ASC : Direction.DESC;

    this.updatePageData()
      .then(data => {
        console.warn('result from sort', data);
      });
  }

  updatePageData() {
    const self = this;

    return this.serverResultsService
      .getResults(this.paging, this.sorting)
      .then(data => self.data = data);
  }
}
