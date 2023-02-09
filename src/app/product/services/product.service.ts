import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductI } from '../interfaces/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  endPoint = 'http://localhost:3000/product';

  constructor(private http: HttpClient) {}

  create(product: ProductI): Observable<ProductI> {
    return this.http.post<ProductI>(this.endPoint, product);
  }

  get(): Observable<Array<ProductI>> {
    return this.http.get<Array<ProductI>>(this.endPoint);
  }

  addStock(_id: string, _addedAmount: number): Observable<ProductI> {
    return this.http.put<ProductI>(`${this.endPoint}/addStock`, {
      _id,
      _addedAmount,
    });
  }

  getOne(_id: string): Observable<ProductI> {
    return this.http.get<ProductI>(`${this.endPoint}/${_id}`);
  }

  update(product: any): Observable<ProductI> {
    return this.http.put<ProductI>(this.endPoint, product);
  }
}
