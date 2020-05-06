import React, { useState } from 'react';
import { Button, Dropdown, Menu, Tooltip, Layout } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import find from 'lodash/find';
import { useDispatch } from 'react-redux';
import styles from './styles.scss';
import CreateBookModalForm from './CreateBookModalForm';
import { CreateBook, CreateEntry } from '../../../state/notes/flows';

const { Sider } = Layout;

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
    return (
      <Menu
        onClick={({ key }) => onSelectEntry(currentBookID, +key)}
        theme="dark"
        defaultSelectedKeys={[`${currentEntryID}`]}
        mode="inline"
      >
        {entrs ? (
          entrs.map(entr => {
            const { title, ID } = entr;
            return <Menu.Item key={ID}>{title}</Menu.Item>;
          })
        ) : (
          <li>No Entries Exist</li>
        )}
      </Menu>
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
          return <Menu.Item key={ID}>{name}</Menu.Item>;
        })}
      <Menu.Divider />
      <Menu.Item key="new-book">+ Create New Book</Menu.Item>
    </Menu>
  );

  const onCreateNewEntry = () => {
    dispatch(CreateEntry(currentBookID));
  };

  return (
    <Sider className={styles['entry-nav']}>
      <div className={styles.buttons}>
        <Dropdown overlay={menu}>
          <Button
            className={styles['book-select-dropdown']}
            onClick={e => e.preventDefault()}
          >
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
            icon={<PlusOutlined />}
          />
        </Tooltip>
      </div>
      {renderEntryTitles(entries)}
    </Sider>
  );
}
