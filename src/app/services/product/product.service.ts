import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PRODUCT_DETAILS_API_URL } from '../../constants';
import { Product } from '../../components/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  // API returns a single data object in an Array
  getProduct(productId: number = 1): Observable<Product[]> {
    return this.http.get<Product[]>(`${PRODUCT_DETAILS_API_URL}/${productId}}`);
  }

  // getProductName(): string {

  // }
}
