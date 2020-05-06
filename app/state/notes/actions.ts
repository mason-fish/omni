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

export function createBook(data: BookType): NotesActionTypes {
  return {
    type: CREATE_BOOK,
    data
  };
}

export function deleteBook(bookID: number): NotesActionTypes {
  return {
    type: DELETE_BOOK,
    bookID
  };
}

export function createEntry(bookID: number, data: EntryType): NotesActionTypes {
  return {
    type: CREATE_ENTRY,
    bookID,
    data
  };
}

export function deleteEntry(bookID: number, entryID: number): NotesActionTypes {
  return {
    type: DELETE_ENTRY,
    bookID,
    entryID
  };
}

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

export function fetchEntryByID(
  bookID: number,
  entryID: number,
  data: EntryType
): NotesActionTypes {
  return {
    type: FETCH_ENTRY,
    data,
    bookID,
    entryID
  };
}

export function setCurrentBookID(bookID: number): NotesActionTypes {
  return {
    type: SET_CURRENT_BOOK_ID,
    bookID
  };
}

export function refreshEntryTitle(
  bookID: number,
  entryID: number,
  title: string
): NotesActionTypes {
  return {
    type: REFRESH_ENTRY_TITLE,
    bookID,
    entryID,
    title
  };
}

export function setCurrentEntryID(
  bookID: number,
  entryID: number
): NotesActionTypes {
  return {
    type: SET_CURRENT_ENTRY_ID,
    entryID,
    bookID
  };
}
