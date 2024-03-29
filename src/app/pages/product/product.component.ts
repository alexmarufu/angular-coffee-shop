import { Component, OnInit, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../interfaces';

@UntilDestroy()
@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  imports: [CommonModule],
})
export class ProductComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private toastr = inject(ToastrService);

  product!: Product;
  loading = false;
  isError = false

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void {
    this.loading = true;
    this.productService
      .getProduct()
      // unsubscribe when the component unmounts
      .pipe(untilDestroyed(this))
      // subscribe for data changes.
      .subscribe({
        next: ([item]) => {
          this.loading = false;
          this.product = item;
          document.title = item.name;
        },
        error: () => {
          this.loading = false;
          this.isError = true
          this.toastr.error(`Something went wrong!`, 'Error!', {
            timeOut: 1000,
          });
        },
      });
  }

  addToCart(product: Product) {
    this.cartService.addToCart({ ...product, quantity: 1 });
    // show a toast message when a product is added to cart
    this.toastr.success(
      `You added ${product.name} to your cart!`,
      'Item added!',
      {
        timeOut: 1000,
      }
    );
  }
}
