import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutI } from '../shared/models/interfaces/layout-interface';
import { ProductService } from './services/product.service';
import { ProductI } from './models/interfaces/product.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';

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
  keyColumns: string[] = ['_name', '_amount', '_price', 'Options'];
  dataSource: Array<ProductI> = [];

  constructor(
    private router: Router,
    private productS: ProductService,
    private dialog: MatDialog, 
    
  ) {
    this.loadData();
  }

  loadData() {
    this.productS.get().subscribe((e: Array<ProductI>) => {
      this.dataSource = e;
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
      return 'Opciones';
  }

  openAddProductModal(product: ProductI) {
    this.dialog.open(AddComponent, { data: product, disableClose: true });
  }

  updateProduct(product: ProductI) {
    const url = `${this.router.url}/update/${product._id}`;
    this.router.navigateByUrl(url);
  }
}
