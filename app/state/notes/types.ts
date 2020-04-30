export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_ENTRIES = 'FETCH_ENTRIES';
export const SET_CURRENT_BOOK_ID = 'SET_CURRENT_BOOK_ID';
export const SET_CURRENT_ENTRY_ID = 'SET_CURRENT_ENTRY_ID';

export interface FetchBooksAction {
  type: typeof FETCH_BOOKS;
  data: BookType[];
}

interface FetchEntriesAction {
  type: typeof FETCH_ENTRIES;
  data: EntryType[];
  bookID: number;
}

interface SetCurrentBookIDAction {
  type: typeof SET_CURRENT_BOOK_ID;
  bookID: number;
}

interface SetCurrentEntryIDAction {
  type: typeof SET_CURRENT_ENTRY_ID;
  entryID: number;
  bookID: number;
}

export type NotesActionTypes =
  | FetchBooksAction
  | FetchEntriesAction
  | SetCurrentBookIDAction
  | SetCurrentEntryIDAction;
