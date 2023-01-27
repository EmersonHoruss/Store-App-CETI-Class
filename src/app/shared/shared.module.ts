import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [LayoutComponent, MessageComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  exports: [LayoutComponent],
})
export class SharedModule {}
