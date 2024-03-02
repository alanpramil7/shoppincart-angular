import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product, User } from '../../types';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrl: './adminpage.component.scss',
})
export class AdminpageComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private userService: UserService,
  ) {}

  products!: Product[];
  user!: User;

  ngOnInit(): void {
    this.fetchProduct();
    this.fetchUser();
  }

  fetchUser() {
    this.userService.getUser().subscribe({
      next: (data: User) => {
        this.user = data;
      },
      error: (e) => {
        console.log('Error getting the user', e);
      },
    });
  }

  fetchProduct() {
    this.productService.getProduct().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (e) => {
        console.log('Error getting products', e);
      },
    });
  }

  deleteProduct(id: number) {
    console.log(id);
    this.productService.deleteProduct(id).subscribe({
      next: (data) => {
        console.log('Product deleted sucessfully');
        const deletedProductIndex = this.products.findIndex(
          (product) => product.id === id,
        );
        this.products.splice(deletedProductIndex, 1);
      },
      error: (e) => {
        console.log('Error deleting product', e);
      },
    });
  }
}
