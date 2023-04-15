import { Component, OnInit, Input, Inject } from '@angular/core';
import { MessageInterface } from '../interfaces/message.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KindMessageEnum } from '../enum/kind-message.enum';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  color!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public message: MessageInterface) {
    const kind: KindMessageEnum = message.kind;

    message.title = this.getTitle(kind);
    message.icon = this.getIcon(kind);
    this.color = `text-${this.getColor(kind)}`;
    // console.log(this.color);
  }

  private getTitle(kind: KindMessageEnum): string {
    if (kind === KindMessageEnum.info) {
      return 'Mensaje de información';
    }
    if (kind === KindMessageEnum.error) {
      return 'Mensaje de error';
    }
    if (kind === KindMessageEnum.warning) {
      return 'Mensaje de advertencia';
    }
    if (kind === KindMessageEnum.success) {
      return 'Mensaje satisfactorio';
    }
    return 'Mensaje no title';
  }

  private getIcon(kind: KindMessageEnum): string {
    if (kind === KindMessageEnum.info) {
      return 'lightbulb';
    }
    if (kind === KindMessageEnum.error) {
      return 'report_problem';
    }
    if (kind === KindMessageEnum.warning) {
      return 'report_problem';
    }
    if (kind === KindMessageEnum.success) {
      return 'thumb_up_alt';
    }
    return '';
  }

  private getColor(kind: KindMessageEnum): string {
    if (kind === KindMessageEnum.info) {
      return 'blue-400';
    }
    if (kind === KindMessageEnum.error) {
      return 'red-600';
    }
    if (kind === KindMessageEnum.warning) {
      return 'yellow-300';
    }
    if (kind === KindMessageEnum.success) {
      return 'green-500';
    }
    return 'black';
  }

  ngOnInit(): void {}
}
