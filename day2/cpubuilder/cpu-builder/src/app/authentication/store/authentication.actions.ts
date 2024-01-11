import {
  Action
} from '@ngrx/store';

export const LOGIN_START = 'Login Start';
export const AUTHENTICATE_SUCCESS = 'Login';
export const AUTHENTICATE_FAIL = 'Login Fail';
export const SIGNUP_START = 'Signup Start';
export const CLEAR_ERROR = 'Clear Error';
export const AUTO_LOGIN = 'Auto Login';
export const LOGOUT = 'Logout';

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(public payload: {
    email: string,
    token: string
  }) {
    console.log('%c6 - signup was successful! lets check data!', 'font-size: 12px; color: white; background; black;');
    console.log(payload);
  }
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: {
    email: string,
    password: string
  }) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: {
    email: string,
    password: string
  }) {
    console.log('%c2 - Received data from Dispatch!', 'font-size: 12px; color: white; background; black;');
    console.log(payload);
  }
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthenticationActions =
AuthenticateSuccess |
Logout |
LoginStart |
AuthenticateFail |
SignupStart |
ClearError |
AutoLogin;
