import React from 'react';
import styles from './styles.scss';
import BookNav from './BookNav';
import EntryNav from './EntryNav';
import EntryToolBar from './EntryToolBar';
import Entry from './Entry';

type Props = {
  books?: Book[];
};

export default function Notes(props: Props) {
  const { books } = props;
  return (
    <div className={styles['notes-wrapper']}>
      <BookNav books={books} />
      <EntryNav />
      <div className={styles['notes-content']}>
        <EntryToolBar />
        <Entry />
      </div>
    </div>
  );
}
