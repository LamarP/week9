import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as AuthActions from './authentication.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../user.model';

export interface AuthResponseData {
  email: string,
  token: string,
  success: boolean
}

const authenticationHandler = (email: string, token: string) => {
  const user = new User(email, token);
  localStorage.setItem('userData', JSON.stringify(user));
  console.log('%c5 - set token in local storage and return a new action that authentication was successful!', 'font-size: 12px; color: white; background; black;');
  return new AuthActions.AuthenticateSuccess({
    email,
    token
  });
};

const errorHandler = (error: { message: string }) => {
  const errorMessage = 'Something went wrong authenticating! Please try again.';
  if (error) {
    return of(new AuthActions.AuthenticateFail(error.message));
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthenticationEffects {
  constructor(private $actions: Actions, private http: HttpClient) {  }

  signup = createEffect(() => this.$actions.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      console.log('%c3 - I looked for ofType SignupStart! lets make a callout!', 'font-size: 12px; color: white; background; black;');
      console.log(signupAction);
      return this.http.post<AuthResponseData>('http://localhost:4000/signup', {
        email: signupAction.payload.email,
        password: signupAction.payload.password
      })
      .pipe(
        map((resData) => {
          console.log('%c4 - for my effect to be finished, I need to return another action! I cant dispatch because that was done in step 1!', 'font-size: 12px; color: white; background; black;');
          console.log(resData);
          return authenticationHandler(resData.email, resData.token);
        }),
        catchError((errorRes) => {
          return errorHandler(errorRes);
        })
      )
    })
  ));

  login = createEffect(() => this.$actions.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap(
      (authData: AuthActions.LoginStart) => this.http.post<AuthResponseData>('http://localhost:4000/login', {
        email: authData.payload.email,
        password: authData.payload.password
      })
      .pipe(
        map((resData) => authenticationHandler(resData.email, resData.token)),
        catchError((errorRes) => errorHandler(errorRes))
      )
    )
  ));

  logout = createEffect(() => this.$actions.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
    })
  ), { dispatch: false })
}
