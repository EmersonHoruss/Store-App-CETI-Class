import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MessageComponent],
  imports: [CommonModule, MatCardModule, MatDialogModule, MatIconModule],
  exports: [MessageComponent],
})
export class MessageModule {}
