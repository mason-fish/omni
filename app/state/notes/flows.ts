import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import newNotesClient from '../../clients/notes';
import {
  fetchBooks,
  fetchEntriesForBook,
  fetchEntryByID,
  setCurrentBookID
} from './actions';

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

export function FetchEntryByID(
  bookID: number,
  entryID: number
): ThunkAction<Promise<EntryType>, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<EntryType> => {
    return new Promise<EntryType>(() => {
      newNotesClient()
        .getEntryByID(bookID, entryID)
        .then(entry => {
          return dispatch(fetchEntryByID(bookID, entryID, entry));
        })
        .catch(err => {
          throw new Error(`fetchEntry failed ${err}`);
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
