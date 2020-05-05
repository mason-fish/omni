import React, { useState } from 'react';
import { Button, Dropdown, Menu, Tooltip } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import find from 'lodash/find';
import { useDispatch } from 'react-redux';
import styles from './styles.scss';
import CreateBookModalForm from './CreateBookModalForm';
import { CreateBook, CreateEntry } from '../../../state/notes/flows';

type Props = {
  entries?: EntryType[];
  books?: BookType[];
  currentBookID: number;
  currentEntryID: number;
  onSelectEntry(bookID: number, entryID: number): void;
  onSelectBook(bookID: number): void;
};

export default function EntryNav({
  entries,
  books,
  currentEntryID,
  currentBookID,
  onSelectEntry,
  onSelectBook
}: Props) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const renderEntryTitles = (entrs?: EntryType[]) => {
    return entrs ? (
      entrs.map(entr => {
        const { title, ID } = entr;
        return (
          <li key={ID}>
            <div
              role="button"
              onClick={() => onSelectEntry(currentBookID, ID)}
              onKeyPress={() => {}}
              tabIndex={0}
            >
              {ID === currentEntryID ? `*${title}` : `${title}`}
            </div>
          </li>
        );
      })
    ) : (
      <li>No Entries Exist</li>
    );
  };

  const currentBook = find(books, (bk: BookType) => bk.ID === currentBookID);
  const currentBookName = currentBook ? currentBook.name : 'Select Book';
  const menu = (
    <Menu
      onClick={({ key }) => {
        if (key === 'new-book') {
          setModalVisible(true);
          return;
        }

        onSelectBook(+key);
      }}
    >
      {books &&
        books.map(bk => {
          const { name, ID } = bk;
          return (
            <Menu.Item key={ID}>
              {currentBookName === name ? `* ${name}` : name}
            </Menu.Item>
          );
        })}
      <Menu.Divider />
      <Menu.Item key="new-book">+ Create New Book</Menu.Item>
    </Menu>
  );

  const onCreateNewEntry = () => {
    dispatch(CreateEntry(currentBookID));
  };

  return (
    <div className={styles['entry-nav']}>
      <Dropdown overlay={menu}>
        <Button className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          {currentBookName}
          <DownOutlined />
        </Button>
      </Dropdown>
      <CreateBookModalForm
        visible={modalVisible}
        onCreate={({ name }) => {
          dispatch(CreateBook(name));
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
      />
      <Tooltip title="New Entry">
        <Button
          onClick={() => onCreateNewEntry()}
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
        />
      </Tooltip>
      <ul>{renderEntryTitles(entries)}</ul>
    </div>
  );
}
