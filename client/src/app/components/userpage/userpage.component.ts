import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product, User } from '../../types';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.scss',
})
export class UserpageComponent implements OnInit {
  products!: Product[];
  user!: User;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.fetchUser();
    this.fetchProduct();
  }

  fetchUser() {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (e) => {
        console.log('Error on gettig user', e);
      },
    });
  }

  fetchProduct() {
    this.productService.getProduct().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (e) => {
        console.log('Error on getting data', e);
      },
    });
  }

  addToCart(productId: number) {
    console.log('Add to cart clicked');
    const userId = this.user.id;
    this.productService.addToCart(userId, productId).subscribe({
      next: (data) => {
        console.log('addedd to cart');
        this.toastr.success('Product added');
        const updatedProductIndex = this.products.findIndex(
          (product) => product.id === productId,
        );
        if (updatedProductIndex !== -1) {
          this.products[updatedProductIndex].productQuantity--;
        }
      },
      error: (e) => {
        console.log('Error adding products in cart', e);
      },
    });
  }
}
