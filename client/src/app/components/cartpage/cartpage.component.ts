import { Component, OnInit } from '@angular/core';
import { Product, User, cartData } from '../../types';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrl: './cartpage.component.scss',
})
export class CartpageComponent implements OnInit {
  user!: User;
  cartData: cartData[] = [];
  products!: Product[];
  totalPrice: number = 0;

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private productService: ProductService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getCart();
  }

  getUser() {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (e) => {
        console.log('Error in getting user data', e);
      },
    });
  }

  getCart() {
    this.cartService.getCart().subscribe({
      next: (data) => {
        this.cartData = data;
        const productIds = Object.values(this.cartData).map(
          (item: any) => item.productId,
        );
        this.productService.getProductBYIds(productIds).subscribe({
          next: (data: Product[]) => {
            this.products = data;
            this.calculateTotal();
          },
        });
      },
      error: (e) => {
        console.log('Error getting cart data', e);
      },
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartData.reduce(
      (total: number, cartItem: cartData) => {
        const product = this.products.find((p) => p.id === cartItem.productId);
        if (product) {
          return total + product.price * cartItem.quantity;
        }
        return total;
      },
      0,
    );
  }

  getQuantity(id: number) {
    const cartItem = this.cartData.find(
      (item: cartData) => item.productId === id,
    );
    return cartItem ? cartItem.quantity : 0;
  }

  handleUpdate(productId: number, operation: string) {
    console.log(productId);
    console.log(operation);
    this.cartService
      .quantityUpdate(this.user.id, productId, operation)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.toastr.success('cart updated');
          const index = this.cartData.findIndex(
            (item: cartData) => item.productId === productId,
          );
          if (index !== -1) {
            if (operation === 'increase') {
              this.cartData[index].quantity++;
            } else if (operation === 'decrease') {
              this.cartData[index].quantity--;
              if (this.cartData[index].quantity === 0) {
                this.cartData.splice(index, 1);
              }
            }
            this.calculateTotal();
            const productIndex = this.products.findIndex(
              (product: Product) => product.id === productId,
            );
            if (productIndex !== -1) {
              if (operation === 'increase') {
                this.products[productIndex].productQuantity++;
              } else if (operation === 'decrease') {
                this.products[productIndex].productQuantity--;
              }
            }
          } else {
            console.log('Cart item not found');
          }
        },
        error: (e) => {
          this.toastr.error("Out of stock")
          console.log('Error on updating the quantity', e);
        },
      });
  }
}
