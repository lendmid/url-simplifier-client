export interface IURL {
  id: number;
  longUrl: string;
  shortUrl: string;
  hash: string;
  origin: string;
}

export interface IVisit {
  origin: string;
  ip: string;
  urlId: number;
}

export interface IVisitsMetrics {
  id: number;
  visitsAmount: number;
  records: IVisit[];
}

export interface IURLTableSchema {
  id: number;
  longUrl: string;
  shortUrl: string;
  hash: string;
  origin: string;
  visits: IVisit[];
}