import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/services/login/login.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent {
  constructor(private router: Router, private loginService: LoginService) {}

  public navigate(page: string): void {
    this.router.navigateByUrl(`/${page}`);
  }

  public logout(): void {
    this.loginService.logout();
  }
}
