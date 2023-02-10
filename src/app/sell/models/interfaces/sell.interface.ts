import { DetailSell } from './detaill-sell.interface';

export interface SellI {
  _id: string;
  _date: Date;
  _total: number;
  _customerName: string;
  _customerDNI: string;
  _detailSells: Array<DetailSell>;
}
