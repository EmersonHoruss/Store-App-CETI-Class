import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormControlStatus,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LayoutI } from 'src/app/shared/models/interfaces/layout-interface';
import { ProductI } from '../models/interfaces/product.interface';
import { ProductService } from '../services/product.service';
import * as _ from 'lodash';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  layout: LayoutI = {
    title: 'Create Product',
    button: {
      icon: 'arrow_back',
      url: '/product',
    },
  };

  form = new FormGroup({
    _id: new FormControl(''),
    _name: new FormControl('', Validators.required),
    _amount: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]*$/),
    ]),
    _price: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]*.?[0-9]{0,2}$/),
    ]),
  });

  initForm = this.form.value;

  id: string = '';

  activedButton: boolean = true;

  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    public dialog: MatDialog,
    private productS: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.setUpWhenIsUpdate();
  }

  private setUpWhenIsUpdate(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.hasOwnProperty('id') ? params['id'] : '';
      if (this.id) {
        this.setUpTitlePage();
        this.loadData();
      }
    });
  }

  private setUpTitlePage() {
    this.layout.title = this.id ? 'Update Product' : 'Create Product';
  }

  private loadData(): void {
    this.productS.getOne(this.id).subscribe((product: ProductI) => {
      this.form.controls['_id'].setValue(product._id);
      this.form.controls['_name'].setValue(product._name);
      this.form.controls['_amount'].setValue(product._amount);
      this.form.controls['_price'].setValue(product._price);

      this.form.controls['_amount'].disable();

      this.initForm = this.form.value;

      this.loading.next(false);
    });
  }

  ngOnInit(): void {
    this.loading.subscribe((e) => {
      if (!e) {
        this.setStatusButton();
        console.log(this.form.value);
        this.watchSaveButton();
      }
    });
  }

  // this.activedButton = this.form.valid && this.formHasChanges();
  private watchSaveButton(): void {
    this.form.valueChanges.subscribe((status: FormControlStatus) => {
      this.activedButton = this.form.valid && this.formHasChanges();
      console.log(this.form.valid, this.formHasChanges());
    });
  }

  private setStatusButton(): void {
    this.activedButton = this.form.valid && this.formHasChanges();
  }

  private isInUpdatePage(): boolean {
    return !!this.id;
  }

  private formHasChanges(): boolean {
    return !_.isEqual(this.initForm, this.form.value);
  }

  public save() {
    this.isInUpdatePage() ? this.update() : this.create();
  }

  private create(): void {
    this.productS.create(this.form.value).subscribe((e) => {
      console.log(e);
    });
  }

  private update(): void {
    this.productS.update(this.form.value).subscribe((e) => {
      console.log(e);
    });
    // console.log(this.router.url)
    // this.router.navigateByUrl(this.router.url);
  }

  openDialog() {}

  show() {
    console.log(this.form.valid, this.formHasChanges());
    console.log(this.form.valid, this.initForm, this.form.value);
    console.log(this.activedButton);
  }
}

// console.log(this.form.value);

// const dialogRef = this.dialog.open(MessageComponent);

// dialogRef.afterClosed().subscribe((result) => {
//   console.log(`Dialog result: ${result}`);
// });
