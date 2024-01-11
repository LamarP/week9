import { ActionReducerMap } from "@ngrx/store";

import * as auth from './authentication/store/authentication.reducer';

export interface AppState {
  authentication: auth.State;
}

// look into second argument in generic, avoid any!
export const appReducer: ActionReducerMap<AppState, any> = {
  authentication: auth.authenticationReducer
}
