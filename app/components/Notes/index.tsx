import React from 'react';
import styles from './styles.scss';
import BookNav from './BookNav';
import EntryNav from './EntryNav';
import EntryToolBar from './EntryToolBar';
import Entry from './Entry';

export default function Notes() {
  return (
    <div className={styles['notes-wrapper']}>
      <BookNav />
      <EntryNav />
      <div className={styles['notes-content']}>
        <EntryToolBar />
        <Entry />
      </div>
    </div>
  );
}
