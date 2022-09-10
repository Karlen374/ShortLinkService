export interface IShortLinkData{
  target: string;
  short: string;
}
export interface IShortUrlTableData extends IShortLinkData {
  counter: number;
}
