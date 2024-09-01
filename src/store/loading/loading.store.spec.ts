import { LoadingState } from "./LoadingState";
import { hide, show } from "./loading.actions";
import { loadingReducer } from "./loading.reducers";
import { createAction } from "@ngrx/store";

describe('loading store', () => {

  it('show', () => {
    const initialState: LoadingState = {show: false}; // loadingReducer
    const newState = loadingReducer(initialState, show());

    expect(newState).toEqual({show: true});
  })

  it('hide', () => {
    const initialState: LoadingState = {show: false}; // loadingReducer
    const newState = loadingReducer(initialState, hide());

    expect(newState).toEqual({show: false});
  })

  it('should keep state if action is unknown ', () => {
    const initialState: LoadingState = {show: true}; // loadingReducer
    const action = createAction("UNKNOWN")
    const newState = loadingReducer(initialState, action);

    expect(newState).toEqual({show: true});
  })
})
