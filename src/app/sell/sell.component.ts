import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '../product/services/product.service';
import { LayoutI } from '../shared/models/interfaces/layout-interface';
import { SellI } from './models/interfaces/sell.interface';
import { SellService } from './services/sell.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
})
export class SellComponent implements OnInit {
  layout: LayoutI = {
    title: 'Sells',
    button: {
      url: '/sell/create',
      icon: 'add',
    },
  };
  keyColumns: string[] = [
    '_date',
    '_total',
    '_customerName',
    '_customerDNI',
    'Options',
  ];
  dataSource: Array<SellI> = [];

  constructor(
    private router: Router,
    private sellS: SellService,
    private dialog: MatDialog
  ) {
    this.loadData();
    console.log(moment('2023-04-15T01:28:58.103Z'));
  }

  private loadData() {
    this.sellS.get().subscribe((sells: Array<SellI>) => {
      this.dataSource = sells;
    });
  }

  ngOnInit(): void {}

  public matchColumn(keyColumn: string): string {
    if (keyColumn === '_date') {
      return 'Fecha';
    }
    if (keyColumn === '_total') {
      return 'Total (soles)';
    }
    if (keyColumn === '_customerName') {
      return 'Nombre Cliente';
    }
    if (keyColumn === '_customerDNI') {
      return 'DNI Cliente';
    }
    return 'Opciones';
  }

  public updateSell(sell: SellI): void {
    const url = `${this.router.url}/update/${sell._id}`;
    this.router.navigateByUrl(url);
  }
}
