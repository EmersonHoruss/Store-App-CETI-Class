import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showFiller = true;

  constructor(private router: Router) {}

  navigate(page: string) {
    this.router.navigateByUrl(`/${page}`);
  }
}
