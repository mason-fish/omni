import { Dispatch, Thunk } from '../types';
import newNotesClient from '../../clients/notes';
import { FETCH_BOOKS, FETCH_ENTRIES, NotesActionTypes } from './types';

export function fetchBooks(data: BookType[]): NotesActionTypes {
  return {
    type: FETCH_BOOKS,
    data
  };
}

export function fetchEntriesForBook(
  bookID: number,
  data: EntryType[]
): NotesActionTypes {
  return {
    type: FETCH_ENTRIES,
    data,
    bookID
  };
}

export function setCurrentBookID(bookID: number): NotesActionTypes {
  return {
    type: 'SET_CURRENT_BOOK_ID',
    bookID
  };
}

export function setCurrentEntryID(
  bookID: number,
  entryID: number
): NotesActionTypes {
  return {
    type: 'SET_CURRENT_ENTRY_ID',
    entryID,
    bookID
  };
}

export function FetchBooks(): Thunk {
  return (dispatch: Dispatch) => {
    // TODO: just call getClient or use package to save this line and dup config
    const c = newNotesClient('http://localhost:8080');
    c.listBooks()
      .then(books => {
        return dispatch(fetchBooks(books));
      })
      // eslint-disable-next-line no-console
      .catch(() => console.error('fetchBooks failed'));
  };
}

// TODO: change to be for current?
export function FetchEntriesForBook(bookID: number): Thunk {
  return (dispatch: Dispatch) => {
    const c = newNotesClient('http://localhost:8080');
    c.listEntriesForBook(bookID)
      .then(entries => {
        return dispatch(fetchEntriesForBook(bookID, entries));
      })
      // eslint-disable-next-line no-console
      .catch(() => console.error('fetchEntries failed'));
  };
}

// export function incrementAsync(delay = 1000) {
//   return (dispatch: Dispatch) => {
//     setTimeout(() => {
//       dispatch(increment());
//     }, delay);
//   };
// }
