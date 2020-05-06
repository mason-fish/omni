import get from 'lodash/get';
import map from 'lodash/map';
import { RootState } from '../types';

export default {
  listBooks: () => (state: RootState): BookType[] => {
    // TODO: Handle empty?
    const books = get(state, ['notes', 'books']);
    return map(books, b => {
      return b.book;
    }).sort(
      (a, b) =>
        new Date(a.UpdatedAt).getTime() - new Date(b.UpdatedAt).getTime()
    );
  },
  listEntriesForBook: (bookID: number) => (state: RootState): EntryType[] => {
    const entries = get(state, ['notes', 'books', bookID, 'entries'], {});
    return Object.values(entries).sort((en1, en2) => {
      // TODO: this is not sorting properly
      return (
        new Date(en1.CreatedAt).getTime() - new Date(en2.CreatedAt).getTime()
      );
    });
  },
  getCurrentBookID: () => (state: RootState): number => {
    return get(state, ['notes', 'currentBookID'], 0);
  },
  getCurrentEntryID: (bookID: number) => (state: RootState): number => {
    return get(state, ['notes', 'books', bookID, 'currentEntryID'], 0);
  }
};
