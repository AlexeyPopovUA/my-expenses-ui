import { Page } from './page';
import { Payment } from './payment';

/**
 * An array of data with an associated page object used for paging
 */
export class PagedData<T> {
  data: Payment[] = [];
  page: Page = new Page();
}
