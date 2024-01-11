import { ActionReducerMap } from "@ngrx/store";

import * as auth from './authentication/store/authentication.reducer';
import * as cpus from './cpus/store/cpu.reducer';

export interface AppState {
  authentication: auth.State;
  cpus: cpus.State;
}

// look into second argument in generic, avoid any!
export const appReducer: ActionReducerMap<AppState, any> = {
  authentication: auth.authenticationReducer,
  cpus: cpus.cpuReducer
}
