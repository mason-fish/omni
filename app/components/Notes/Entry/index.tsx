import React, { ChangeEvent, useEffect, useState } from 'react';
import find from 'lodash/find';
import ReactMarkdown from 'react-markdown';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Layout, Empty } from 'antd';
import styles from './styles.scss';
import { useDebouncedEffect, usePrevious } from '../../../hooks';
import newNotesClient from '../../../clients/notes';
import { refreshEntryTitle } from '../../../state/notes/actions';

const { Content } = Layout;

type Props = {
  entries?: EntryType[];
  isEditView: boolean;
  currentEntryID: number;
  currentBookID: number;
};

export default function Entry({
  isEditView,
  entries,
  currentEntryID,
  currentBookID
}: Props) {
  const dispatch = useDispatch();
  const currentEntry = find(entries, ent => ent.ID === currentEntryID);
  const currentEntryContent = currentEntry ? currentEntry.content : '';
  const currentEntryTitle = currentEntry && currentEntry.title;

  const [content, setContent] = useState(currentEntryContent);
  const [title, setTitle] = useState(currentEntryTitle);
  const [entryID, setEntryID] = useState(currentEntryID);
  const prevContent = usePrevious(content);
  const prevEntryID = usePrevious(entryID);
  useDebouncedEffect(
    () => {
      if (prevEntryID !== entryID) {
        setEntryID(entryID);
        return;
      }
      if (!prevContent || prevContent === content) {
        return;
      }

      newNotesClient().updateEntry(currentBookID, currentEntryID, {
        content
      });
    },
    1000,
    [content, entryID]
  );

  useEffect(() => {
    setContent(currentEntryContent);
  }, [currentEntryContent]);
  useEffect(() => {
    setTitle(currentEntryTitle);
  }, [currentEntryTitle]);
  useEffect(() => {
    setEntryID(currentEntryID);
    if (entryID === 0) {
      setContent('');
    }
  }, [currentEntryID]);

  const updateContent = ({
    target: { value }
  }: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(value);
  };

  const updateTitle = ({
    target: { value }
  }: ChangeEvent<HTMLTextAreaElement>) => {
    newNotesClient().updateEntry(currentBookID, currentEntryID, {
      title: value
    });
    dispatch(refreshEntryTitle(currentBookID, currentEntryID, value));
  };

  const renderTitle = () => {
    if (!currentEntry) return null;
    return (
      <TextArea
        onBlur={updateTitle}
        onChange={({ target: { value } }) => setTitle(value)}
        value={title}
        autoSize
        readOnly={!isEditView}
      />
    );
  };

  const renderContent = () => {
    if (!currentEntry)
      return (
        <Empty
          className={styles['empty-view']}
          description="No Entry Selected"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          Select or create a new one to get started!
        </Empty>
      );
    return isEditView ? (
      <TextArea onChange={updateContent} value={content} autoSize />
    ) : (
      <ReactMarkdown source={content} />
    );
  };

  const renderEntryMeta = () => {
    if (!currentEntry) return null;
    return (
      <div className={styles.meta}>
        {renderTitle()}
        <div className={styles.timestamps}>
          <p>{`Created: ${moment(currentEntry.CreatedAt).format('LLL')}`}</p>
          <p>{`Updated: ${moment(currentEntry.UpdatedAt).format('LLL')}`}</p>
        </div>
      </div>
    );
  };

  return (
    <Content className={styles.entry}>
      {renderEntryMeta()}
      {currentEntry && <hr />}
      {renderContent()}
    </Content>
  );
}
