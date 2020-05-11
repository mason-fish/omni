import React from 'react';
import { Layout } from 'antd';
import styles from './styles.scss';
import EntryNav from './EntryNav';
import Entry from './Entry';

const { Content } = Layout;

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
    <Layout hasSider style={{ height: '100%' }}>
      <EntryNav
        entries={entries}
        books={books}
        onSelectBook={onSelectBook}
        onSelectEntry={onSelectEntry}
      />
      <Content style={{ height: '100%' }}>
        <Layout className={styles['notes-wrapper']}>
          <Entry
            entries={entries}
            currentEntryID={currentEntryID}
            currentBookID={currentBookID}
          />
        </Layout>
      </Content>
    </Layout>
  );
}
