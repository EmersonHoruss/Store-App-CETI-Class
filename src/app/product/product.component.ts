import { Component, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutI } from '../shared/models/interfaces/layout-interface';
import { ProductService } from './services/product.service';
import { ProductI } from './models/interfaces/product.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';

import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  layout: LayoutI = {
    title: 'Products',
    button: {
      url: '/product/create',
      icon: 'add',
    },
  };
  keyColumns: string[] = ['_index', '_name', '_amount', '_price', 'Options'];
  dataView: Array<ProductI> = [];
  dataSource: Array<ProductI> = [];

  length!: number;
  pageSizeOptions: Array<number> = [5, 10, 50, 100];
  pageSize: number = 10;

  constructor(
    private router: Router,
    private productS: ProductService,
    private dialog: MatDialog
  ) {
    this.loadData();
  }

  loadData() {
    this.productS.get().subscribe((e: Array<ProductI>) => {
      this.dataSource = e.map((e, index) => {
        e._index = index + 1;
        return e;
      });
      this.dataView = this.paginateData(0);
      this.length = this.dataSource.length;
    });
  }

  matchColumn(keyColumn: string): string {
    if (keyColumn === '_name') {
      return 'Nombre';
    }
    if (keyColumn === '_amount') {
      return 'Cantidad';
    }
    if (keyColumn === '_price') {
      return 'Precio (soles)';
    }
    if (keyColumn === '#') {
      return '#';
    }
    return 'Opciones';
  }

  openAddProductModal(product: ProductI) {
    this.dialog.open(AddComponent, { data: product, disableClose: true });
  }

  updateProduct(product: ProductI) {
    const url = `${this.router.url}/update/${product._id}`;
    this.router.navigateByUrl(url);
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
