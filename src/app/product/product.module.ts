import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { MaterialModule } from '../material/material.module';

import { ProductComponent } from './product.component';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProductComponent, FormComponent],
  imports: [CommonModule, MaterialModule, ProductRoutingModule, SharedModule],
  exports: [ProductComponent],
})
export class ProductModule {}
