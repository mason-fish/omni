import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import newNotesClient from '../../clients/notes';
import {
  createBook,
  createEntry,
  deleteBook,
  deleteEntry,
  fetchBooks,
  fetchEntriesForBook,
  fetchEntryByID,
  setCurrentBookID,
  setCurrentEntryID
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

export function CreateBook(
  title: string
): ThunkAction<Promise<BookType>, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<BookType> => {
    return new Promise<BookType>(() => {
      newNotesClient()
        .createBook(title)
        .then(book => {
          dispatch(createBook(book));
          dispatch(setCurrentBookID(book.ID));
          return book;
        })
        .catch(err => {
          throw new Error(`createBook failed: ${err}`);
        });
    });
  };
}

export function DeleteBook(
  bookID: number
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>(() => {
      newNotesClient()
        .deleteBook(bookID)
        .then(() => {
          dispatch(deleteBook(bookID));
          return undefined;
        })
        .catch(err => {
          throw new Error(`deleteBook failed: ${err}`);
        });
    });
  };
}

export function CreateEntry(
  bookID: number
): ThunkAction<Promise<EntryType>, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<EntryType> => {
    return new Promise<EntryType>(() => {
      newNotesClient()
        .createEntryForBook(bookID, 'Title')
        .then(entry => {
          dispatch(createEntry(bookID, entry));
          dispatch(setCurrentEntryID(bookID, entry.ID));
          return entry;
        })
        .catch(err => {
          throw new Error(`createEntry failed: ${err}`);
        });
    });
  };
}

export function DeleteEntry(
  bookID: number,
  entryID: number
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>(() => {
      newNotesClient()
        .deleteBookEntry(bookID, entryID)
        .then(entry => {
          dispatch(deleteEntry(bookID, entryID));
          return entry;
        })
        .catch(err => {
          throw new Error(`deleteEntry failed: ${err}`);
        });
    });
  };
}
