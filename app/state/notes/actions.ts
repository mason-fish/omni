import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
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

export function FetchEntriesForBook(
  bookID: number
): ThunkAction<Promise<EntryType[]>, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<EntryType[]> => {
    return new Promise<EntryType[]>(() => {
      const c = newNotesClient('http://localhost:8080');
      c.listEntriesForBook(bookID)
        .then(entries => {
          return dispatch(fetchEntriesForBook(bookID, entries));
        })
        .catch(err => {
          throw new Error(`fetchEntries failed ${err}`);
        });
    });
  };
}

export function initNotes(): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>(resolve => {
      // TODO: just call getClient or use package to save this line and dup config
      const c = newNotesClient('http://localhost:8080');
      c.listBooks()
        .then(books => {
          if (books.length !== 0) {
            const firstBookID = books[0].ID;
            dispatch(setCurrentBookID(firstBookID));
            dispatch(FetchEntriesForBook(firstBookID));
          }
          dispatch(fetchBooks(books));
          return resolve();
        })
        .catch(err => {
          throw new Error(`listBooks failed: ${err}`);
        });
    });
  };
}

// export function incrementAsync(delay = 1000) {
//   return (dispatch: Dispatch) => {
//     setTimeout(() => {
//       dispatch(increment());
//     }, delay);
//   };
// }
