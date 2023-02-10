import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LayoutI } from 'src/app/shared/models/interfaces/layout-interface';
import { DetailSellComponent } from '../detail-sell/detail-sell.component';
import { DetailSell } from '../models/interfaces/detaill-sell.interface';
import { SellService } from '../services/sell.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
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

  constructor(private dialog: MatDialog, private sellS: SellService) {}

  ngOnInit(): void {}

  public cancel(): void {
    console.log('cancel');
  }

  public save(): void {
    console.log(this.form);
    console.log(this.dataSource);
    this.sellS
      .create({
        ...this.form.value,
        _date: new Date(),
        _detailSells: this.dataSource,
      })
      .subscribe((e) => console.log('Congrats!!!'));
    localStorage.clear();
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
