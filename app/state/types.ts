import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';
import { RouterState } from 'connected-react-router';

export type State = {
  books: Book[];
  entries: Entry[];
};

export interface RootState {
  router: RouterState;
  notes: State;
}

export type GetState = () => State;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Thunk = (dispatch: Dispatch, state: GetState) => any;

export type Store = ReduxStore<RootState, Action<string>>;
