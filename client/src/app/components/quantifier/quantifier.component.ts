import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quantifier',
  templateUrl: './quantifier.component.html',
  styleUrl: './quantifier.component.scss',
})
export class QuantifierComponent {
  @Input() quantity: number = 0;
  @Input() product: Product | undefined;
  @Output() handleUpdate: EventEmitter<any> = new EventEmitter();

  constructor(private toastr: ToastrService) {}

  incresae() {
    if (this.product?.productQuantity !== 0) {
      this.handleUpdate.emit({
        productId: this.product?.id,
        operation: 'increase',
      });
    } else {
      this.toastr.error("Out of stock")
    }
  }
  reduce() {
    this.handleUpdate.emit({
      productId: this.product?.id,
      operation: 'decrease',
    });
  }
}
