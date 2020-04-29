import { Dispatch, Thunk } from '../types';
import newNotesClient from '../../clients/notes';
import { FETCH_BOOKS, FETCH_ENTRIES, NotesActionTypes } from './types';

export function fetchBooks(data: Book[]): NotesActionTypes {
  return {
    type: FETCH_BOOKS,
    data
  };
}

export function fetchEntriesForBook(data: Entry[]): NotesActionTypes {
  return {
    type: FETCH_ENTRIES,
    data
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
      .catch(() => console.error('fetchBooks failed'));
  };
}

// export function incrementAsync(delay = 1000) {
//   return (dispatch: Dispatch) => {
//     setTimeout(() => {
//       dispatch(increment());
//     }, delay);
//   };
// }
