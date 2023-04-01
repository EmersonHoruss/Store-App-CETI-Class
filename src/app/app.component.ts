import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showFiller = true;
  isLogged = false;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.getIsLogged().subscribe((e) => {
      console.log(e);
      this.isLogged = e;
    });
  }

  navigate(page: string) {
    this.router.navigateByUrl(`/${page}`);
  }
}
