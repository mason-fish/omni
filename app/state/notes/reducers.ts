import get from 'lodash/get';
import { BooksState, State } from '../types';
import {
  CREATE_BOOK,
  CREATE_ENTRY,
  DELETE_BOOK,
  DELETE_ENTRY,
  FETCH_BOOKS,
  FETCH_ENTRIES,
  FETCH_ENTRY,
  NotesActionTypes,
  REFRESH_ENTRY_TITLE,
  SET_CURRENT_BOOK_ID,
  SET_CURRENT_ENTRY_ID
} from './types';

const initialState = (): State => {
  return {
    currentBookID: 0,
    books: {}
  };
};

export default function reducers(
  state = initialState(),
  action: NotesActionTypes
): State {
  const books = {} as BooksState;
  let entries = {} as { [key: number]: EntryType };
  const newState = state;
  switch (action.type) {
    case FETCH_BOOKS:
      action.data.forEach(b => {
        entries = get(state, ['books', b.ID, 'entries'], {});
        books[b.ID] = {
          ...state.books[b.ID],
          entries,
          book: b
        };
      });
      return {
        ...state,
        books
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
    case REFRESH_ENTRY_TITLE:
      return {
        ...state,
        books: {
          ...state.books,
          [action.bookID]: {
            ...state.books[action.bookID],
            entries: {
              ...state.books[action.bookID].entries,
              [action.entryID]: {
                ...state.books[action.bookID].entries[action.entryID],
                title: action.title
              }
            }
          }
        }
      };
    case FETCH_ENTRY:
      return {
        ...state,
        books: {
          ...state.books,
          [action.bookID]: {
            ...state.books[action.bookID],
            entries: {
              ...state.books[action.bookID].entries,
              [action.entryID]: action.data
            }
          }
        }
      };
    case CREATE_BOOK:
      return {
        ...state,
        books: {
          ...state.books,
          [action.data.ID]: {
            book: action.data,
            currentEntryID: 0,
            entries: []
          }
        }
      };
    case CREATE_ENTRY:
      return {
        ...state,
        books: {
          ...state.books,
          [action.bookID]: {
            ...state.books[action.bookID],
            entries: {
              ...state.books[action.bookID].entries,
              [action.data.ID]: action.data
            }
          }
        }
      };
    case DELETE_BOOK:
      delete newState.books[action.bookID];
      if (newState.currentBookID === action.bookID) {
        newState.currentBookID = 0;
      }
      return {
        ...newState
      };
    case DELETE_ENTRY:
      delete newState.books[action.bookID].entries[action.entryID];
      // reset current ID if we just deleted that entry
      if (newState.books[action.bookID].currentEntryID === action.entryID) {
        newState.books[action.bookID].currentEntryID = 0;
      }
      return {
        ...newState
      };
    default:
      return state;
  }
}
