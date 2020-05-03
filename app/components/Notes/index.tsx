import React, { useState } from 'react';
import styles from './styles.scss';
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

  const [isEditView, setIsEditView] = useState(true);

  const onToggleView = () => {
    setIsEditView(c => !c);
  };

  return (
    <div className={styles['notes-wrapper']}>
      <EntryNav
        entries={entries}
        books={books}
        onSelectBook={onSelectBook}
        onSelectEntry={onSelectEntry}
        currentBookID={currentBookID}
        currentEntryID={currentEntryID}
      />
      <div className={styles['notes-content']}>
        <EntryToolBar onToggleView={onToggleView} />
        <Entry
          entries={entries}
          currentEntryID={currentEntryID}
          currentBookID={currentBookID}
          isEditView={isEditView}
        />
      </div>
    </div>
  );
}
