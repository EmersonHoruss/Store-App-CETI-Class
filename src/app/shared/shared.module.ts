import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from './message/message.module';
@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MessageModule,
  ],
  exports: [LayoutComponent, ReactiveFormsModule],
})
export class SharedModule {}
