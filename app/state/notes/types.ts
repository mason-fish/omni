export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_ENTRIES = 'FETCH_ENTRIES';

interface FetchBooksAction {
  type: typeof FETCH_BOOKS;
  data: Book[];
}

interface FetchEntriesAction {
  type: typeof FETCH_ENTRIES;
  data: Entry[];
}

export type NotesActionTypes = FetchBooksAction | FetchEntriesAction;
