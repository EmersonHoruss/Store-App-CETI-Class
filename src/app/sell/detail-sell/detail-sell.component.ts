import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { start } from 'repl';
import { ProductI } from 'src/app/product/models/interfaces/product.interface';
import { ProductService } from 'src/app/product/services/product.service';
import { KindMessageEnum } from 'src/app/shared/message/enum/kind-message.enum';
import { MessageInterface } from 'src/app/shared/message/interfaces/message.interface';
import { MessageComponent } from 'src/app/shared/message/message/message.component';

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
    _amount: new FormControl('', [Validators.required, Validators.min(1)]),
    _total: new FormControl('0'),
  });

  keyColumns: string[] = ['_index', '_name', '_amount', '_price', 'Options'];

  dataView: Array<ProductI> = [];
  dataSource: Array<ProductI> = [];

  selected: string = '';

  length!: number;
  pageSizeOptions: Array<number> = [5, 10, 50, 100];
  pageSize: number = 10;

  amountError: string = 'Es obligatorio.';

  constructor(
    private productS: ProductService,
    private dialogRef: MatDialogRef<DetailSellComponent>,
    public dialog: MatDialog
  ) {
    this.loadData();
    this.setJustViewTotal();
  }

  private loadData(): void {
    this.productS.get().subscribe((e: Array<ProductI>) => {
      this.dataSource = e.map((e, index) => {
        e._index = index + 1;
        return e;
      });
      this.dataView = this.paginateData(0);
      this.length = this.dataSource.length;
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
    if (!this.componentHasErrors()) {
      const detailSells: Array<any> = JSON.parse(this.getItem());
      detailSells.push({
        ...this.form.value,
        _total: this.form.controls['_total'].value,
      });
      const stringDetailSells = JSON.stringify(detailSells);
      localStorage.setItem('detailSells', stringDetailSells);
      this.showSuccess();
      this.dialogRef.close();
    } else {
      this.managerErrors();
    }
  }

  private componentHasErrors(): boolean {
    return (
      !this.isFormValid() || !this.isRequiredAmountLessOrEqualsAsProductAmoutn()
    );
  }

  private isFormValid(): boolean {
    this.form.controls['_amount'].markAsTouched();

    return this.form.status === 'VALID';
  }

  private isRequiredAmountLessOrEqualsAsProductAmoutn(): boolean {
    if (this.isFormValid()) {
      const name: string = this.form.controls['_product'].value;
      const product: ProductI | undefined = this.dataSource.find(
        (e) => e._name === name
      );

      if (product) {
        const productAmount: number = product._amount;
        const requiredAmount: number = this.form.controls['_amount'].value;
        return requiredAmount <= productAmount;
      }
    }

    return false;
  }

  private managerErrors(): void {
    this.showErrorLikeMatError();

    const productErrors: Validators | null =
      this.form.controls['_product'].errors;

    if (productErrors && productErrors.hasOwnProperty('required')) {
      this.showError('Seleccione un producto.');
      return;
    }

    if (!this.isRequiredAmountLessOrEqualsAsProductAmoutn()) {
      this.showError('Cantidad excede al stock.');
      return;
    }
  }

  private showErrorLikeMatError(): void {
    const amountErrors: Validators | null =
      this.form.controls['_amount'].errors;

    if (amountErrors) {
      if (amountErrors.hasOwnProperty('min')) {
        this.amountError = 'No debe ser menor que 0.';
      }

      if (amountErrors.hasOwnProperty('required')) {
        this.amountError = 'Es obligatorio.';
      }
    }
  }

  private showSuccess(): void {
    const message: MessageInterface = {
      kind: KindMessageEnum.success,
      content: 'Se ha agregado un detalle de venta.',
    };

    this.dialog.open(MessageComponent, { data: message });
  }

  private showError(message: string): void {
    const data: MessageInterface = {
      kind: KindMessageEnum.error,
      content: message,
    };

    this.dialog.open(MessageComponent, { data });
  }

  private getItem(): string {
    const item = localStorage.getItem('detailSells');
    if (item) {
      return item;
    }
    return '[]';
  }

  public updateData(e: any): void {
    console.log(e);
    this.pageSize = e.pageSize;
    this.dataView = this.paginateData(e.pageIndex);
  }

  private paginateData(pageIndex: number): Array<ProductI> {
    const start: number = this.pageSize * pageIndex;
    const end: number = this.pageSize * (pageIndex + 1);
    return this.dataSource.slice(start, end);
  }
}
