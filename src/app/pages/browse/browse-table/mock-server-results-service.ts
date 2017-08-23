import { Injectable } from '@angular/core';
import { Payment } from './model/payment';
import { Page } from './model/page';
import { Http, ResponseContentType } from '@angular/http';
import { Sorting } from './model/sorting';

/**
 * A server used to mock a paged data result from a server
 */
@Injectable()
export class MockServerResultsService {

  constructor(private http: Http) {
  }

  /**
   * A method that mocks a paged server response
   * @param paging The selected paging
   * @param sorting
   * @returns {any} An observable containing the employee data
   */
  getResults(paging: Page, sorting: Sorting): Promise<Payment[]> {
    return new Promise((resolve, reject) => {
      const searchParams: URLSearchParams = new URLSearchParams();

      searchParams.set('page', paging.pageNumber.toString());
      searchParams.set('limit', paging.size.toString());
      searchParams.set('sort', JSON.stringify([{ field: sorting.field, direction: sorting.direction }]));

      console.warn('searchParams p', searchParams.getAll('page'));
      console.warn('searchParams s', searchParams.getAll('sort'));

      this.http
        .get('http://localhost:3000/payments/get', {
          responseType: ResponseContentType.Json,
          params: searchParams.toString()
        })
        .toPromise()
        .then(response => {
          const resultData = [];
          const result = response.json();

          paging.totalElements = result.results;
          paging.totalPages = paging.totalElements / paging.size;

          for (const payment of result.items) {
            resultData.push(new Payment(payment._id, payment.name, payment.category, payment.date, payment.value));
          }

          resolve(resultData);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  }
}
