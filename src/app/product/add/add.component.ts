import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductI } from '../models/interfaces/product.interface';
import { ProductService } from '../services/product.service';

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

  clonedProduct!: ProductI;

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: ProductI,
    private dialogRef: MatDialogRef<AddComponent>,
    private productS: ProductService
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

  ngOnInit(): void {}

  public save(): void {
    this.productS
      .addStock(this.clonedProduct._id, this.form.value._addedAmount)
      .subscribe((product: ProductI) => {
        this.clonedProduct._amount = product._amount;
        this.dialogRef.close();
      });
  }
}
