import { Component, OnInit, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../components/interfaces';

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

  ngOnInit() {
    this.loading = true;
    this.productService
      .getProduct()
      .pipe(untilDestroyed(this))
      .subscribe(([item]) => {
        this.loading = false;
        this.product = item;
        document.title = item.name;
      });
  }

  addToCart(product: Product) {
    this.cartService.addToCart({ ...product, quantity: 1 });
    this.toastr.success(
      `You added ${product.name} to your cart!`,
      'Item added!',
      {
        timeOut: 1000,
      }
    );
  }
}
