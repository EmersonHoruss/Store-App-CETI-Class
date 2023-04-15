import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { ProductI } from '../models/interfaces/product.interface';
import { ProductService } from '../services/product.service';
import { MessageComponent } from 'src/app/shared/message/message/message.component';
import { MessageInterface } from 'src/app/shared/message/interfaces/message.interface';
import { KindMessageEnum } from 'src/app/shared/message/enum/kind-message.enum';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  form = new FormGroup({
    _name: new FormControl(''),
    _amount: new FormControl(''),
    _addedAmount: new FormControl('', Validators.required),
  });

  amountError: string = 'Es obligatorio';

  clonedProduct!: ProductI;

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: ProductI,
    private dialogRef: MatDialogRef<AddComponent>,
    private productS: ProductService,
    public dialog: MatDialog
  ) {
    this.clonedProduct = product;
    this.settingForm(product);
  }

  private settingForm(product: ProductI) {
    this.form.controls['_name'].setValue(product._name);
    this.form.controls['_amount'].setValue(product._amount);
    this.form.controls['_name'].disable();
    this.form.controls['_amount'].disable();
  }

  ngOnInit(): void {
    this.form.controls['_addedAmount'].valueChanges.subscribe(
      (currentAmount) => {
        if (this.isHigherThanAmount(currentAmount)) {
          this.setHigherAddedAmountError();
        }

        this.managerAddedAmountError();
      }
    );
  }

  private isHigherThanAmount(currentAmount: number): boolean {
    return currentAmount > this.form.controls['_amount'].value;
  }

  private setHigherAddedAmountError(): void {
    this.form.controls['_addedAmount'].setErrors({ higherThanAmount: true });
  }

  private managerAddedAmountError(): void {
    const errors: ValidationErrors | null =
      this.form.controls['_addedAmount'].errors;

    if (errors) {
      if (errors.hasOwnProperty('required')) {
        this.amountError = 'Es obligatorio.';
      }

      if (errors.hasOwnProperty('higherThanAmount')) {
        this.amountError = 'No debe superar a la cantidad.';
      }
    }
  }

  public save(): void {
    if (this.isValidAddedAmount()) {
      this.productS
        .addStock(this.clonedProduct._id, this.form.value._addedAmount)
        .subscribe(
          (product: ProductI) => {
            const message: MessageInterface = {
              kind: KindMessageEnum.success,
              content: 'Se agregaron productos satisfactoriamente.',
            };
            this.dialog
              .open(MessageComponent, { data: message })
              .afterClosed()
              .subscribe(() => {
                this.clonedProduct._amount = product._amount;
                this.dialogRef.close();
              });
          },
          (err) => {
            const message: MessageInterface = {
              kind: KindMessageEnum.success,
              content:
                'Ha surgido un error, contacte al adminsitrador 989 812 342.',
            };
            this.dialog.open(MessageComponent, { data: message });
          }
        );
    }
  }

  private isValidAddedAmount(): boolean {
    return !!!this.form.controls['_addedAmount'].errors;
  }
}
