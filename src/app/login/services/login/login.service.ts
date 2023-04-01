import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserInterface } from '../../interfaces/user.interface';
import { users } from '../../data/users.data';
import { LoginAnswer } from '../../interfaces/login-answer.interface';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.getIsLoggedFromLocalStorage()
  );

  constructor() {
    const isLogged: boolean = this.getIsLoggedFromLocalStorage();
    this.setIsLogged(isLogged);
  }

  private setIsLogged(isLogged: boolean): void {
    this.isLogged.next(isLogged);
    this.setIsLoggedFromLocalStorage();
  }

  public getIsLogged(): BehaviorSubject<boolean> {
    return this.isLogged;
  }

  private getIsLoggedFromLocalStorage(): boolean {
    const isLogged: string | null = localStorage.getItem('isLogged');

    if (!!isLogged) {
      return isLogged === 'true' ? true : false;
    }

    return false;
  }

  private setIsLoggedFromLocalStorage(): void {
    localStorage.setItem('isLogged', JSON.stringify(this.isLogged.getValue()));
  }

  public login(user: UserInterface): LoginAnswer {
    const isInDB = users.find(
      (e) => e._name === user._name && e._password === user._password
    );

    this.setIsLogged(!!isInDB);

    return {
      _nameIsIncorrect: !this.existName(user),
      _passwordIsIncorrect: !this.existPassword(user),
    };
  }

  private existName(user: UserInterface): boolean {
    return !!users.find((e) => e._name === user._name);
  }

  private existPassword(user: UserInterface): boolean {
    return !!users.find((e) => e._password === user._password);
  }

  public logout(): void {
    this.setIsLogged(false);
  }
}
