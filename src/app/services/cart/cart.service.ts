import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart$ = new BehaviorSubject<Cart[]>([]);

  addToCart(cartItem: Cart): void {
    const product = this.cart$.value.find((item) => item.id === cartItem.id);

    if (product) {
      this.cart$.next([
        ...this.cart$.value.filter(({ id }) => id !== product.id),
        { ...product, quantity: product.quantity + 1 },
      ]);
    } else {
      this.cart$.next([...this.cart$.value, cartItem]);
    }
  }

  getCart(): Observable<Cart[]> {
    return this.cart$;
  }

}
