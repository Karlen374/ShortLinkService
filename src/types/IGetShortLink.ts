export type IOrder = {
  order: 'asc_counter' | 'asc_short' | 'asc_target' | 'desc_short' | 'desc_target' | 'desc_counter';
}
export interface IGetShortLink{
  token: string;
  offset: number;
  limit: number;
  order: IOrder | null;
}
