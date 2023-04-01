import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserInterface } from '../../interfaces/user.interface';
import { users } from '../../data/users.data';

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

  public login(user: UserInterface): void {
    const isInDB = users.find(
      (e) => e.name === user.name && e.password === user.password
    );

    this.setIsLogged(!!isInDB);
  }

  public logout(): void {
    this.setIsLogged(false);
  }
}
