import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LayoutI } from 'src/app/shared/models/interfaces/layout-interface';
import { DetailSellComponent } from '../detail-sell/detail-sell.component';
import { DetailSell } from '../models/interfaces/detaill-sell.interface';
import { SellService } from '../services/sell.service';
import { MessageInterface } from 'src/app/shared/message/interfaces/message.interface';
import { KindMessageEnum } from 'src/app/shared/message/enum/kind-message.enum';
import { MessageComponent } from 'src/app/shared/message/message/message.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  layout: LayoutI = {
    title: 'Create Sell',
    button: {
      icon: 'arrow_back',
      url: '/sell',
    },
  };

  form = new FormGroup({
    _id: new FormControl(''),
    _customerName: new FormControl('', Validators.required),
    _customerDNI: new FormControl('', Validators.required),
  });

  keyColumns: string[] = ['_product', '_amount', '_price', '_total'];

  nameError: string = 'Es obligatorio.';
  DNIError: string = 'Es obligatorio.';

  public matchColumn(keyColumn: string): string {
    if (keyColumn === '_product') {
      return 'Producto';
    }
    if (keyColumn === '_amount') {
      return 'Cantidad';
    }
    if (keyColumn === '_price') {
      return 'Nombre Cliente';
    }
    if (keyColumn === '_total') {
      return 'Total (soles)';
    }
    return '';
  }

  dataSource: Array<DetailSell> = [];

  constructor(
    private dialog: MatDialog,
    private sellS: SellService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('detailSells');
  }

  ngOnDestroy(): void {
    localStorage.removeItem('detailSells');
  }

  public cancel(): void {
    this.router.navigateByUrl('/sell');
  }

  public save(): void {
    if (!this.hasError()) {
      this.sellS
        .create({
          ...this.form.value,
          _date: new Date(),
          _detailSells: this.dataSource,
        })
        .subscribe(
          (e) => {
            this.showSuccess();
            localStorage.removeItem('detailSells');
          },
          (e) =>
            this.showError(
              'Algo inesperado surgió, contacte al administrador si el error persiste: 981324184'
            )
        );
    }
    this.managerErrors();
  }

  private hasError(): boolean {
    this.form.controls['_customerName'].markAsTouched();
    this.form.controls['_customerDNI'].markAsTouched();

    return !this.isFormValid() || !this.isDetailProductsValid();
  }

  private isFormValid(): boolean {
    return this.form.status === 'VALID';
  }

  private isDetailProductsValid(): boolean {
    return !!this.dataSource.length;
  }

  private managerErrors(): void {
    let messageError: string = '';

    if (!this.isDetailProductsValid()) {
      messageError = 'Agregue al menos un producto a vender.';
    }

    if (!this.isFormValid()) {
      messageError = 'Nombre y/o DNI está incorrectos.';
    }

    this.showError(messageError);
  }

  private showSuccess(): void {
    const message: MessageInterface = {
      kind: KindMessageEnum.success,
      content: 'Se ha registrado una venta.',
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

  public openAddProductModal() {
    const dialogRef = this.dialog.open(DetailSellComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((closed: any) => {
      this.dataSource = JSON.parse(this.getItem());
    });
  }

  private getItem(): string {
    const item = localStorage.getItem('detailSells');
    if (item) {
      return item;
    }
    return '[]';
  }

  private calculateTotal(): number {
    let total = 0;
    for (let i = 0; i < this.dataSource.length; i++) {
      const element = this.dataSource[i];
      total += element._total;
    }
    return total;
  }
}
