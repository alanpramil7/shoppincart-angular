import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProduct(): Observable<any> {
    return this.http.get('http://localhost:5001/products');
  }

  newProduct(
    title: string,
    price: string,
    thumbnail: string,
    productQuantity: string,
  ): Observable<any> {
    const data = { title, price, thumbnail, productQuantity };
    return this.http.post('http://localhost:5001/products/newproduct', data, {
      withCredentials: true,
    });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`http://localhost:5001/products/${id}`, {
      withCredentials: true,
    });
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`http://localhost:5001/products/${id}`, {
      withCredentials: true,
    });
  }

  updateProduct(
    id: number,
    title: string,
    price: string,
    thumbnail: string,
    productQuantity: string,
  ): Observable<any> {
    const data = { title, price, thumbnail, productQuantity };
    return this.http.put(`http://localhost:5001/products/${id}`, data, {
      withCredentials: true,
    });
  }

  addToCart(userId: number, productId: number): Observable<any> {
    const data = { userId, productId };
    return this.http.post(`http://localhost:5001/cart/add`, data, {
      withCredentials: true,
    });
  }

  getProductBYIds(ids: number[]): Observable<any> {
    return this.http.post(
      'http://localhost:5001/products/productbyids',
      { ids },
      {
        withCredentials: true,
      },
    );
  }
}
