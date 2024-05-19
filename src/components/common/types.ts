export interface IPagination {
  pageSize: number;
  current: number;
  total: number;
}

export interface IUrl {
  id: string;
  longUrl: string;
  shortUrl: string;
  hash: string;
}
