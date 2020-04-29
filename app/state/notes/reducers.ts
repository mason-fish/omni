import { State } from '../types';
import { FETCH_BOOKS, FETCH_ENTRIES, NotesActionTypes } from './types';

const initialState: State = {
  books: [],
  entries: []
};

export default function reducers(
  state = initialState,
  action: NotesActionTypes
): State {
  switch (action.type) {
    case FETCH_BOOKS:
      return {
        ...state,
        books: [...action.data]
      };
    case FETCH_ENTRIES:
      return {
        ...state,
        entries: [...action.data]
      };
    default:
      return state;
  }
}
