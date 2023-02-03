import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { MaterialModule } from '../material/material.module';

import { ProductComponent } from './product.component';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [ProductComponent, FormComponent, AddComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ProductRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  exports: [ProductComponent],
})
export class ProductModule {}
