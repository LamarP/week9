export class User {
  constructor(public email: string, private _token: string) {}

  get token(): null | string | boolean {
    return this._token;
  }
}
