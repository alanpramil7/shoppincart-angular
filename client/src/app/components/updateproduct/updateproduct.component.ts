import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrl: './updateproduct.component.scss',
})
export class UpdateproductComponent implements OnInit {
  product!: Product;
  id!: number;
  updateForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private activatedRoutes: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.activatedRoutes.params.subscribe({
      next: (param) => {
        this.id = param['productId'];
        this.productService.getProductById(this.id).subscribe({
          next: (data: Product) => {
            this.product = data;
            this.updateForm = new FormGroup({
              title: new FormControl(this.product.title, Validators.required),
              price: new FormControl(this.product.price, Validators.required),
              thumbnail: new FormControl(
                this.product.thumbnail,
                Validators.required,
              ),
              productQuantity: new FormControl(
                this.product.productQuantity,
                Validators.required,
              ),
            });
          },
          error: (e) => {
            console.log('Error getting product by id', e);
          },
        });
      },
      error: (e) => {
        console.log('Error on getting products to upgrade', e);
      },
    });
  }

  onSubmit() {
    this.productService
      .updateProduct(
        this.id,
        this.updateForm.value.title,
        this.updateForm.value.price,
        this.updateForm.value.thumbnail,
        this.updateForm.value.productQuantity,
      )
      .subscribe({
        next: (data) => {
          this.toastr.success('Product updated');
        },
        error: (e) => {
          this.toastr.error('Error updating product');
          console.log('Error on updating the product', e);
        },
        complete: () => {
          this.router.navigate(['adminpage']);
        },
      });
  }
}
