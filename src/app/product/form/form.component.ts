import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LayoutI } from 'src/app/shared/models/interfaces/layout-interface';

import { MessageComponent } from '../../shared/components/message/message.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form = new FormGroup({
    _name: new FormControl('', Validators.required),
    _amount: new FormControl('', Validators.required),
    _price: new FormControl('', Validators.required),
  });

  layout: LayoutI = {
    title: 'New Product',
    button: {
      icon: 'arrow_back',
      url: '/product',
    },
  };

  disabledButton: boolean = true;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.form.statusChanges.subscribe((e) => {
      this.disabledButton = e === 'INVALID';
    });
  }

  save() {
    console.log(this.form);
    this.openDialog()
  }

  openDialog() {
    const dialogRef = this.dialog.open(MessageComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
