import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedData } from './model/paged-data';
import { Payment } from './model/payment';
import { Page } from './model/page';

const paymentData = [
  {
    'name': 'AH',
    'category': 'Food',
    'date': 'Sat Aug 19 2017 21:11:56 GMT+0200 (CEST)',
    'value': 22
  }, {
    'name': 'AH',
    'category': 'Food',
    'date': 'Sat Aug 19 2017 21:11:56 GMT+0200 (CEST)',
    'value': 22
  }, {
    'name': 'AH',
    'category': 'Food',
    'date': 'Sat Aug 19 2017 21:11:57 GMT+0200 (CEST)',
    'value': 32
  }, {
    'name': 'Smth',
    'category': 'Travelling',
    'date': 'Sat Aug 19 2017 21:11:58 GMT+0200 (CEST)',
    'value': 21
  }, {
    'name': 'AH',
    'category': 'Food',
    'date': 'Sat Aug 19 2017 21:11:59 GMT+0200 (CEST)',
    'value': 122
  }, {
    'name': 'AH',
    'category': 'Food',
    'date': 'Sat Aug 19 2017 21:11:54 GMT+0200 (CEST)',
    'value': 23
  }, {
    'name': 'AH',
    'category': 'Food',
    'date': 'Sat Aug 19 2017 21:11:23 GMT+0200 (CEST)',
    'value': 32
  }
];

/**
 * A server used to mock a paged data result from a server
 */
@Injectable()
export class MockServerResultsService {

  /**
   * A method that mocks a paged server response
   * @param page The selected page
   * @returns {any} An observable containing the employee data
   */
  public getResults(page: Page): Observable<PagedData<Payment>> {
    return Observable.of(paymentData).map(data => this.getPagedData(page));
  }

  /**
   * Package companyData into a PagedData object based on the selected Page
   * @param page The page data used to get the selected data from companyData
   * @returns {PagedData<Payment>} An array of the selected data and page
   */
  private getPagedData(page: Page): PagedData<Payment> {
    const pagedData = new PagedData<Payment>();
    page.totalElements = paymentData.length;
    page.totalPages = page.totalElements / page.size;
    const start = page.pageNumber * page.size;
    const end = Math.min((start + page.size), page.totalElements);
    for (let i = start; i < end; i++) {
      const jsonObj = paymentData[i];
      const payment = new Payment(jsonObj.name, jsonObj.category, jsonObj.date, jsonObj.value);
      pagedData.data.push(payment);
    }
    pagedData.page = page;
    return pagedData;
  }

}
