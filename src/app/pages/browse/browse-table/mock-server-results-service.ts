import { Injectable } from '@angular/core';
import { PagedData } from './model/paged-data';
import { Payment } from './model/payment';
import { Page } from './model/page';
import { Http } from '@angular/http';

/**
 * A server used to mock a paged data result from a server
 */
@Injectable()
export class MockServerResultsService {
  private pagedData: PagedData<Payment> = new PagedData<Payment>();

  constructor(private http: Http) {
  }

  /**
   * A method that mocks a paged server response
   * @param page The selected page
   * @returns {any} An observable containing the employee data
   */
  getResults(page: Page): Promise<PagedData<Payment>> {
    return this.getPagedDataRemote(page);
  }

  private getPagedDataRemote(page: Page): Promise<PagedData<Payment>> {
    return new Promise((resolve, reject) => {
      this.http
        .get('http://localhost:3000/payments/get')
        .toPromise()
        .then(response => {
          const result = response.json();

          page.totalElements = result.results;
          page.totalPages = page.totalElements / page.size;

          const start = page.pageNumber * page.size;
          const end = Math.min((start + page.size), page.totalElements);

          this.pagedData.data.length = 0;

          for (let i = start; i < end; i++) {
            const jsonObj = result.items[i];
            const payment = new Payment(jsonObj._id, jsonObj.name, jsonObj.category, jsonObj.date, jsonObj.value);
            this.pagedData.data.push(payment);
          }

          this.pagedData.page = page;

          resolve(this.pagedData);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  }

}

/*
this.source = new BrowseTableDataSource(http, {
    endPoint: 'http://localhost:3000/payments/get',
    dataKey: 'items',
    pagerPageKey: 'page',
    pagerLimitKey: 'limit',
    totalKey: 'results',
    sortFieldKey: 'sort',
    sortDirKey: 'direction'
});*/
