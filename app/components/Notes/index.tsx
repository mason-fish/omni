import React from 'react';
import styles from './styles.scss';
import BookNav from './BookNav';
import EntryNav from './EntryNav';
import EntryToolBar from './EntryToolBar';
import Entry from './Entry';

type Props = {
  books?: BookType[];
  entries?: EntryType[];
  currentBookID: number;
  currentEntryID: number;
  onSelectBook(bookID: number): void;
  onSelectEntry(bookID: number, entryID: number): void;
};

export default function Notes(props: Props) {
  const {
    books,
    entries,
    onSelectBook,
    onSelectEntry,
    currentBookID,
    currentEntryID
  } = props;
  return (
    <div className={styles['notes-wrapper']}>
      <BookNav
        books={books}
        onSelectBook={onSelectBook}
        currentBookID={currentBookID}
      />
      <EntryNav
        entries={entries}
        onSelectEntry={onSelectEntry}
        currentBookID={currentBookID}
        currentEntryID={currentEntryID}
      />
      <div className={styles['notes-content']}>
        <EntryToolBar />
        <Entry entries={entries} currentEntryID={currentEntryID} />
      </div>
    </div>
  );
}
