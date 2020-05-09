import React, { useState } from 'react';
import { Layout } from 'antd';
import styles from './styles.scss';
import EntryNav from './EntryNav';
import EntryToolBar from './EntryToolBar';
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

  const [isEditView, setIsEditView] = useState(true);

  const onToggleView = () => {
    setIsEditView(c => !c);
  };

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
          <EntryToolBar
            currentEntryID={currentEntryID}
            isEditView={isEditView}
            onToggleView={onToggleView}
          />
          <Entry
            entries={entries}
            currentEntryID={currentEntryID}
            currentBookID={currentBookID}
            isEditView={isEditView}
          />
        </Layout>
      </Content>
    </Layout>
  );
}
