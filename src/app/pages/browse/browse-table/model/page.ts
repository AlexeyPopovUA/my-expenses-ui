/**
 * An object used to get paging information from the server
 */
export class Page {
  // The number of elements in the paging
  size: number = 10;
  // The total number of elements
  totalElements: number = 0;
  // The total number of pages
  totalPages: number = 0;
  // The current paging number
  pageNumber: number = 0;
}
