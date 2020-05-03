import React, { ChangeEvent, useEffect, useState } from 'react';
import find from 'lodash/find';
import ReactMarkdown from 'react-markdown';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import styles from './styles.scss';
import { useDebouncedEffect, usePrevious } from '../../../hooks';
import newNotesClient from '../../../clients/notes';
import { refreshEntryTitle } from '../../../state/notes/actions';

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
  const currentEntryTitle = currentEntry ? currentEntry.title : '';

  const [content, setContent] = useState(currentEntryContent);
  const [title, setTitle] = useState(currentEntryTitle);
  const [entryID, setEntryID] = useState(currentEntryID);
  const prevContent = usePrevious(content);
  const prevEntryID = usePrevious(entryID);
  const prevTitle = usePrevious(title);
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

  useDebouncedEffect(
    () => {
      if (prevEntryID !== entryID) {
        return;
      }
      if (!prevContent || prevTitle === title) {
        return;
      }

      newNotesClient().updateEntry(currentBookID, currentEntryID, {
        title
      });
      // update title for rest of app
      dispatch(refreshEntryTitle(currentBookID, currentEntryID, title));
    },
    1000,
    [title, entryID]
  );

  useEffect(() => {
    setContent(currentEntryContent);
  }, [currentEntryContent]);
  useEffect(() => {
    setTitle(currentEntryTitle);
  }, [currentEntryTitle]);
  useEffect(() => {
    setEntryID(currentEntryID);
  }, [currentEntryID]);

  const updateContent = ({
    target: { value }
  }: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(value);
  };

  const updateTitle = ({
    target: { value }
  }: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(value);
  };

  const renderTitle = () => {
    if (!currentEntry) return null;
    return isEditView ? (
      <TextArea onChange={updateTitle} value={title || 'Title'} autoSize />
    ) : (
      <h1>{title}</h1>
    );
  };

  const renderContent = () => {
    if (!currentEntry)
      return (
        <div>Select an existing or create a new entry to get started!</div>
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
    <div className={styles.entry}>
      {renderEntryMeta()}
      {currentEntry && <hr />}
      {renderContent()}
    </div>
  );
}
