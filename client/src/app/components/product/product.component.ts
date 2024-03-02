import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  ngOnInit(): void {
    this.fetchProduct();
  }

  constructor(private productService: ProductService) {}

  fetchProduct() {
    this.productService.getProduct().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (error) => {
        console.log('Error fetching the products', error);
      },
    });
  }
}
