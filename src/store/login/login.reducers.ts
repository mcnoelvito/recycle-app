import { Action, createReducer, on } from '@ngrx/store';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { LoginState } from "./LoginState";
import { AppInitialState } from '../AppInitialState';

const initialState: LoginState = AppInitialState.login;

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
    return {
        ...currentState,
        error: null,
        isRecoveredPassword: true,
        isRecoveringPassword: false,
      }; // currentState;
  }),
  on(recoverPasswordFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isRecoveredPassword: false,
      isRecoveringPassword: false,
    };
  }),
)

export function loginReducer(state: LoginState, action: Action<string>){
  return reducer(state, action);
}


