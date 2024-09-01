import { LoadingState } from "./LoadingState";
import { hide, show } from "./loading.actions";
import { loadingReducer } from "./loading.reducers";

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
})
