import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get('http://localhost:5001/cart', {
      withCredentials: true,
    });
  }

  // getCartBYIds(ids: number[]): Observable<any> {
  //   return this.http.post('http://localhost:5001/cart', ids, {
  //     withCredentials: true,
  //   });
  // }

  quantityUpdate(
    userId: number,
    productId: number,
    operation: string,
  ): Observable<any> {
    const data = { operation, id: userId };
    return this.http.put(`http://localhost:5001/cart/${productId}`, data, {
      withCredentials: true,
    });
  }
}
