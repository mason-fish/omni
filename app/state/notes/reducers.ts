import get from 'lodash/get';
import { BooksState, State } from '../types';
import {
  FETCH_BOOKS,
  FETCH_ENTRIES,
  NotesActionTypes,
  SET_CURRENT_BOOK_ID,
  SET_CURRENT_ENTRY_ID
} from './types';

const initialState: State = {
  currentBookID: 0,
  books: {}
};

export default function reducers(
  state = initialState,
  action: NotesActionTypes
): State {
  const books = {} as BooksState;
  let entries = {} as { [key: number]: EntryType };
  switch (action.type) {
    case FETCH_BOOKS:
      action.data.forEach(b => {
        entries = get(state, ['books', b.ID, 'entries'], {});
        books[b.ID] = {
          entries,
          book: b,
          currentEntryID: 0
        };
      });
      return {
        ...state,
        books,
        currentBookID: 0
      };
    case FETCH_ENTRIES:
      action.data.forEach(e => {
        entries[e.ID] = e;
      });
      return {
        ...state,
        books: {
          ...state.books,
          [action.bookID]: {
            ...state.books[action.bookID],
            entries
          }
        }
      };
    case SET_CURRENT_BOOK_ID:
      return {
        ...state,
        currentBookID: action.bookID
      };
    case SET_CURRENT_ENTRY_ID:
      return {
        ...state,
        // reset current entry
        books: {
          ...state.books,
          [action.bookID]: {
            ...state.books[action.bookID],
            currentEntryID: action.entryID
          }
        }
      };
    default:
      return state;
  }
}
