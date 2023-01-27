import { Component, OnInit } from '@angular/core';
import { MessageI } from '../../models/interfaces/message-interface';
import { TypeMessageE } from '../../models/enums/typeMessage-enum';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  message: MessageI = {
    type: TypeMessageE.success,
    message: 'It is a default message',
  };

  constructor() {}

  ngOnInit(): void {}

  isAConfirmMessage(): boolean {
    return this.message.type === TypeMessageE.confirm;
  }
}
