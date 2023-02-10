import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellRoutingModule } from './sell-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { SellComponent } from './sell.component';
import { FormComponent } from './form/form.component';
import { DetailSellComponent } from './detail-sell/detail-sell.component';

@NgModule({
  declarations: [SellComponent, FormComponent, DetailSellComponent],
  imports: [
    CommonModule,
    SellRoutingModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
  ],
})
export class SellModule {}
