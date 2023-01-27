import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { ProductModule } from './product/product.module';
import { SellModule } from './sell/sell.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { OptionsComponent } from './options/options.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, OptionsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ProductModule,
    SellModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
