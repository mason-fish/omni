import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';
import { RouterState } from 'connected-react-router';

// TODO: figure out whether we want a de/normalized structure here or what?
// TODO: It needs to store current book and current entry per book though and we want a consistent ordering
export type State = {
  currentBookID: number;
  books: BooksState;
};

export type BooksState = {
  [key: number]: {
    book: BookType;
    currentEntryID: number;
    entries: { [key: number]: EntryType };
  };
};

export interface RootState {
  router: RouterState;
  notes: State;
}

export type GetState = () => State;

export type Dispatch = ReduxDispatch<Action<string>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Thunk = (dispatch: Dispatch, state: GetState) => any;

export type Store = ReduxStore<RootState, Action<string>>;
