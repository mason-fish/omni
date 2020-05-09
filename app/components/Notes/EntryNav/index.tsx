import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Menu, Tooltip, Layout, Popconfirm } from 'antd';
import { DownOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import find from 'lodash/find';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.scss';
import CreateBookModalForm from './CreateBookModalForm';
import {
  CreateBook,
  CreateEntry,
  DeleteBook,
  DeleteEntry
} from '../../../state/notes/flows';
import notes from '../../../state/notes/selectors';

const { Sider } = Layout;

type Props = {
  entries?: EntryType[];
  books?: BookType[];
  onSelectEntry(bookID: number, entryID: number): void;
  onSelectBook(bookID: number): void;
};

const useStateWithUpdate = (el: unknown): unknown => {
  const [elState, setElState] = useState(el);
  useEffect(() => {
    setElState(el);
  }, [el]);

  return elState;
};

export default function EntryNav({
  entries,
  books,
  onSelectEntry,
  onSelectBook
}: Props) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [showTrash, setShowTrash] = useState(0);
  const [showEntryTrash, setShowEntryTrash] = useState(0);
  const currentBookID = useSelector(notes.getCurrentBookID());
  const currentEntryID = useStateWithUpdate(
    useSelector(notes.getCurrentEntryID(currentBookID))
  );

  const renderEntryTitles = (entrs?: EntryType[]) => {
    return (
      <Menu
        onClick={({ key }) => onSelectEntry(currentBookID, +key)}
        theme="dark"
        defaultSelectedKeys={[`${currentEntryID}`]}
        selectedKeys={[`${currentEntryID}`]}
        mode="inline"
      >
        {entrs ? (
          entrs.map(entr => {
            const { title, ID } = entr;
            return (
              <Menu.Item
                className={styles['menu-item']}
                key={ID}
                onMouseEnter={() => setShowEntryTrash(ID)}
                onMouseLeave={() => setShowEntryTrash(0)}
              >
                <span>{title}</span>
                {showEntryTrash === ID ? (
                  <Popconfirm
                    placement="right"
                    title={`Are you sure delete this entry: "${title}"?`}
                    onConfirm={e => {
                      if (e) e.stopPropagation();
                      dispatch(DeleteEntry(currentBookID, ID));
                    }}
                    onCancel={e => {
                      if (e) e.stopPropagation();
                    }}
                    okText="Delete"
                    cancelText="Cancel"
                  >
                    <Button
                      className={styles['delete-button']}
                      danger
                      size="small"
                      type="link"
                      icon={<DeleteOutlined />}
                      onClick={e => {
                        e.stopPropagation();
                      }}
                    />
                  </Popconfirm>
                ) : (
                  <span className={styles['delete-button']} />
                )}
              </Menu.Item>
            );
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
          return (
            <Menu.Item
              className={styles['menu-item']}
              key={ID}
              onMouseEnter={() => setShowTrash(ID)}
              onMouseLeave={() => setShowTrash(0)}
            >
              <span>{name}</span>
              {showTrash === ID ? (
                <Popconfirm
                  placement="right"
                  title={`Are you sure you want to delete this book: "${name}"?`}
                  onConfirm={e => {
                    if (e) e.stopPropagation();
                    dispatch(DeleteBook(ID));
                  }}
                  onCancel={e => {
                    if (e) e.stopPropagation();
                  }}
                  okText="Delete"
                >
                  <Button
                    className={styles['delete-button']}
                    danger
                    size="small"
                    type="link"
                    icon={<DeleteOutlined />}
                    onClick={e => {
                      e.stopPropagation();
                    }}
                  />
                </Popconfirm>
              ) : (
                // use empty span so that flex keeps items aligned
                <span className={styles['delete-button']} />
              )}
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
            disabled={currentBookID === 0}
            type="primary"
            icon={<PlusOutlined />}
          />
        </Tooltip>
      </div>
      {renderEntryTitles(entries)}
    </Sider>
  );
}
