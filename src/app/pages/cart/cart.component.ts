import { Component, inject, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { Cart } from '../../interfaces';

@UntilDestroy()
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);
  cart: Cart[] = [];

  ngOnInit(): void {
    document.title = "Cart"
    this.getCart()
  }

  getCart(): void {
     this.cartService
      .getCart()
      // unsubscribe when the component unmounts.
      .pipe(untilDestroyed(this))
      // subscribe for data changes.
      .subscribe((items) => {
        this.cart = items
      });
  }
}
