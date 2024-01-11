import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as AuthenticationActions from './store/authentication.actions';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  constructor(private store: Store<AppState>) {}

  loggingIn: boolean = true;
  loading: boolean = false;
  error: string | null = null;

  changeMode() {
    this.loggingIn = !this.loggingIn;
  }

  mode(btn?: string): string {
    if (btn === 'switch') {
      return this.loggingIn ? 'Sign Up' : 'Login';
    }
    return this.loggingIn ? 'Login' : 'Sign Up';
  }

  onSubmit(form: NgForm): void {
    if (this.loggingIn) {
      // perform login start
      this.store.dispatch(new AuthenticationActions.LoginStart(form.value));
    } else {
      // perform signup start
      console.log('%c1 - Dispatching SignupStart!!!', 'font-size: 12px; color: white; background; black;');
      console.log(form.value);
      this.store.dispatch(new AuthenticationActions.SignupStart(form.value));
    }
  }
}
