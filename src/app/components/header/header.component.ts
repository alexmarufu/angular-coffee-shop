import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';

@UntilDestroy()
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private location = inject(Location);

  totalCartItems = 0;
  headerTitle = '';

  ngOnInit(): void {
    this.headerTitle = document.title;
    this.cartService
      .getCart()
      // unsubscribe when the component unmounts
      .pipe(untilDestroyed(this))
      // subscribe for to cart Observable for changes
      .subscribe((cartItems) => {
        this.totalCartItems = cartItems.length;
      });

    this.productService
      .getProduct()
      // unsubscribe when the component unmounts
      .pipe(untilDestroyed(this))
      // subscribe for to product Observable for changes
      .subscribe(([product]) => {
        this.headerTitle = product.name;
        document.title = product.name;
      });
  }

  back(): void {
    this.location.back();
  }
}
