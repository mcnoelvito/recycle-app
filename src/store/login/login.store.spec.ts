import { recoverPassword } from "./login.actions"
import { loginReducer } from "./login.reducers"
import { LoginState } from "./LoginState"

describe("Login store", () => {

  it('recoverPassword', () => {
    const initialState: LoginState = {
      error: null,
      isLoggedIn: false,
      isLoggingIn: false,
      isRecoveredPassword: false,
      isRecoveringPassword: false
    }

const newState = loginReducer(initialState, recoverPassword());
expect (newState). toEqual({
    ... initialState,
    error: null,
    isRecoveredPassword: false,
    isRecoveringPassword: true
  })

  })
})
