export interface IPagination {
  pageSize: number;
  pageNumber: number;
  total: number;
}

export interface IUrl {
  id: string;
  longUrl: string;
  shortUrl: string;
  hash: string;
}
