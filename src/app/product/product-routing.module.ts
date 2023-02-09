import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'create', component: FormComponent },
  { path: 'update/:id', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
