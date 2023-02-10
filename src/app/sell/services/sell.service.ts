import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SellI } from '../models/interfaces/sell.interface';

@Injectable({
  providedIn: 'root',
})
export class SellService {
  endPoint = 'http://localhost:3000/sell';

  constructor(private http: HttpClient) {}

  create(product: SellI): Observable<SellI> {
    return this.http.post<SellI>(this.endPoint, product);
  }

  get(): Observable<Array<SellI>> {
    return this.http.get<Array<SellI>>(this.endPoint);
  }

  getOne(_id: string): Observable<SellI> {
    return this.http.get<SellI>(`${this.endPoint}/${_id}`);
  }
}
