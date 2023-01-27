import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutI } from '../models/interfaces/layout-interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {
  @Input() layout!: LayoutI;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigate(page: string) {
    this.router.navigateByUrl(page);
  }
}
