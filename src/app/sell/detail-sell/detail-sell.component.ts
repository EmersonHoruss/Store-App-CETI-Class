import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductI } from 'src/app/product/models/interfaces/product.interface';
import { ProductService } from 'src/app/product/services/product.service';

@Component({
  selector: 'app-detail-sell',
  templateUrl: './detail-sell.component.html',
  styleUrls: ['./detail-sell.component.scss'],
})
export class DetailSellComponent implements OnInit {
  form = new FormGroup({
    _idProduct: new FormControl(),
    _product: new FormControl('', Validators.required),
    _price: new FormControl('', Validators.required),
    _amount: new FormControl('', Validators.required),
    _total: new FormControl('0'),
  });

  keyColumns: string[] = ['_name', '_amount', '_price', 'Options'];

  dataSource: Array<ProductI> = [];

  selected: string = '';

  constructor(
    private productS: ProductService,
    private dialogRef: MatDialogRef<DetailSellComponent>
  ) {
    this.loadData();
    this.setJustViewTotal();
  }

  private loadData(): void {
    this.productS.get().subscribe((products: Array<ProductI>) => {
      this.dataSource = products;
    });
  }

  private setJustViewTotal(): void {
    this.form.controls['_total'].disable();
  }

  ngOnInit(): void {
    this.form.controls['_amount'].valueChanges.subscribe((_amount) => {
      const _price = this.form.controls['_price'].value;

      if (_amount && _price) {
        this.form.controls['_total'].setValue(_price * _amount);
      }
    });
  }

  public matchColumn(keyColumn: string): string {
    if (keyColumn === '_name') {
      return 'Nombre';
    }
    if (keyColumn === '_amount') {
      return 'Cantidad';
    }
    if (keyColumn === '_price') {
      return 'Precio (soles)';
    }
    return 'Opciones';
  }

  public select(product: ProductI): void {
    this.selected = product._id;
    this.form.controls['_idProduct'].setValue(product._id);
    this.form.controls['_product'].setValue(product._name);
    this.form.controls['_price'].setValue(product._price);
    const _price = this.form.controls['_price'].value;
    const _amount = this.form.controls['_amount'].value;
    if (_amount && _price) {
      this.form.controls['_total'].setValue(_price * _amount);
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public save(): void {
    const detailSells: Array<any> = JSON.parse(this.getItem());
    detailSells.push({
      ...this.form.value,
      _total: this.form.controls['_total'].value,
    });
    const stringDetailSells = JSON.stringify(detailSells);
    localStorage.setItem('detailSells', stringDetailSells);
    this.dialogRef.close();
  }

  private getItem(): string {
    const item = localStorage.getItem('detailSells');
    if (item) {
      return item;
    }
    return '[]';
  }
}
