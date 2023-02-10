import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { SellComponent } from './sell.component';

const routes: Routes = [
  { path: '', component: SellComponent },
  { path: 'create', component: FormComponent },
  { path: 'update/:id', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellRoutingModule {}
