import { Action, createReducer, on } from '@ngrx/store';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { LoginState } from "./LoginState";

const initialState: LoginState = {
  error: null,
  isRecoveredPassword: false,
  isRecoveringPassword: false,
  isLoggedIn: false,
  isLoggingIn: false
};

const reducer = createReducer(initialState,
  on(recoverPassword, currentState => {
    return {
      ... currentState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true
    };
  }),
  on(recoverPasswordSuccess, currentState => {
    return currentState;
  }),
  on(recoverPasswordFail, currentState => {
    return currentState;
  }),
)

export function loginReducer(state: LoginState, action: Action<string>){
  return reducer(state, action);
}


