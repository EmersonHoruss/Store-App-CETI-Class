import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { LoginAnswer } from '../interfaces/login-answer.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    _name: new FormControl('', Validators.required),
    _password: new FormControl('', Validators.required),
  });

  nameError: string = 'Nombre incorrecto.';
  passwordError: string = 'Contraseña incorrecta.';

  isVisible: boolean = false;
  typePassword: string = 'password';

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  public login(): void {
    const loginAnswer: LoginAnswer = this.loginService.login(this.form.value);

    if (loginAnswer._nameIsIncorrect) {
      this.form.controls['_name'].setErrors({});
    }

    if (loginAnswer._passwordIsIncorrect) {
      this.form.controls['_password'].setErrors({});
    }
  }

  public toggleVisibility(): void {
    this.isVisible = !this.isVisible;
    console.log(this.isVisible);
    if (this.isVisible) {
      this.typePassword = 'text';
    } else {
      this.typePassword = 'password';
    }
  }
}
