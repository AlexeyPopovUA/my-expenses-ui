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
  templateUrl: './browse-table.html'
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

  ngOnInit(): void {
    this.updatePageData()
      .catch(error => console.error(error));
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
      })
      .catch(error => console.error(error));
  }

  onSort(sortInfo) {
    const sorter = sortInfo.sorts[0];
    this.sorting.field = sorter.prop;
    this.sorting.direction = sorter.dir === 'asc' ? Direction.ASC : Direction.DESC;
    // we have to go to the first page because of the table behavior
    this.paging.pageNumber = 0;

    this.updatePageData()
      .then(data => {
        console.warn('result from sort', data);
      })
      .catch(error => console.error(error));
  }

  updatePageData() {
    const self = this;

    return this.serverResultsService
      .getResults(this.paging, this.sorting)
      .then(data => self.data = data);
  }

  onSelect(selection) {
    console.log(selection);
  }
}
