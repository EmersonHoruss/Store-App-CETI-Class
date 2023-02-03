import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductI } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  endPoint = 'http://localhost:3000/product';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Array<ProductI>> {
    return this.http.get<Array<ProductI>>(this.endPoint);
  }

  postProduct() {}

  addProducts(_id: string, _addedAmount: number): Observable<ProductI> {
    return this.http.put<ProductI>(this.endPoint + '/addStock', {
      _id,
      _addedAmount,
    });
  }
}
