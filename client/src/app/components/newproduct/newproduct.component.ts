import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrl: './newproduct.component.scss',
})
export class NewproductComponent implements OnInit {
  newProductForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.newProductForm = new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      thumbnail: new FormControl('', Validators.required),
      productQuantity: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log('Submit butto clicked');
    console.log(this.newProductForm);
    const { title, price, thumbnail, productQuantity } =
      this.newProductForm.value;
    this.productService
      .newProduct(title, price, thumbnail, productQuantity)
      .subscribe({
        next: (data) => {
          console.log('Product added succesfuly');
        },
        error: (e) => {
          console.log('Error in adding the product', e);
        },
        complete: () => {
          this.router.navigate(['adminpage']);
        },
      });
  }
}
