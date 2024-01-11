import { User } from "../user.model";
import * as AuthenticationActions from './authentication.actions';

export interface State {
  user: User | null;
  authError: string | null;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
}

export function authenticationReducer(
  state: State = initialState,
  action: AuthenticationActions.AuthenticationActions
): State {
  switch(action.type) {
    case AuthenticationActions.AUTHENTICATE_SUCCESS:
      console.log('%c7 - within reducer authenticate success was returned! lets check action!', 'font-size: 12px; color: white; background; black;');
      console.log(action);
      const user: User = new User(
        action.payload.email,
        action.payload.token
      )
      return {
        ...state,
        authError: null,
        loading: false,
        user
      }
    default:
      return state;
  }
}
