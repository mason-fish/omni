export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_ENTRIES = 'FETCH_ENTRIES';
export const FETCH_ENTRY = 'FETCH_ENTRY';
export const SET_CURRENT_BOOK_ID = 'SET_CURRENT_BOOK_ID';
export const SET_CURRENT_ENTRY_ID = 'SET_CURRENT_ENTRY_ID';
export const REFRESH_ENTRY_TITLE = 'REFRESH_ENTRY_TITLE';
export const CREATE_BOOK = 'CREATE_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const CREATE_ENTRY = 'CREATE_ENTRY';
export const DELETE_ENTRY = 'DELETE_ENTRY';

interface FetchBooksAction {
  type: typeof FETCH_BOOKS;
  data: BookType[];
}

interface CreateBookAction {
  type: typeof CREATE_BOOK;
  data: BookType;
}

interface DeleteBookAction {
  type: typeof DELETE_BOOK;
  bookID: number;
}

interface CreateEntryAction {
  type: typeof CREATE_ENTRY;
  bookID: number;
  data: EntryType;
}

interface DeleteEntryAction {
  type: typeof DELETE_ENTRY;
  bookID: number;
  entryID: number;
}

interface FetchEntriesAction {
  type: typeof FETCH_ENTRIES;
  data: EntryType[];
  bookID: number;
}

interface FetchEntryAction {
  type: typeof FETCH_ENTRY;
  data: EntryType;
  entryID: number;
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

interface RefreshEntryTitleAction {
  type: typeof REFRESH_ENTRY_TITLE;
  entryID: number;
  bookID: number;
  title: string;
}

export type NotesActionTypes =
  | FetchBooksAction
  | FetchEntriesAction
  | SetCurrentBookIDAction
  | SetCurrentEntryIDAction
  | RefreshEntryTitleAction
  | FetchEntryAction
  | CreateBookAction
  | DeleteBookAction
  | CreateEntryAction
  | DeleteEntryAction;
