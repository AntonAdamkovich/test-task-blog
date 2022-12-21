export interface IPaginationInfo {
  prelink: string;
  current: number;
  previous: number;
  next: number;
  first: number;
  last: number;
  range: Array<number>;
  fromResult: number;
  toResult: number;
  totalResult: number;
  pageCount: number;
}

export interface WithPagination<T> {
  data: T;
  meta: IPaginationInfo;
}
