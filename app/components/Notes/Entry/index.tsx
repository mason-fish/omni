import React, { ChangeEvent, useEffect, useState } from 'react';
import find from 'lodash/find';
import get from 'lodash/get';
import ReactMarkdown from 'react-markdown';
import TextArea from 'antd/es/input/TextArea';
import styles from './styles.scss';

type Props = {
  entries?: EntryType[];
  isEditView: boolean;
  currentEntryID: number;
};

export default function Entry({ isEditView, entries, currentEntryID }: Props) {
  const currentEntry = get(
    find(entries, ent => {
      return ent.ID === currentEntryID;
    }),
    ['content'],
    undefined
  );

  const [content, setContent] = useState(currentEntry);

  useEffect(() => {
    setContent(currentEntry);
  }, [currentEntry]);

  const updateContent = ({
    target: { value }
  }: ChangeEvent<HTMLTextAreaElement>) => {
    console.log('changing my value');
    setContent(value);
  };

  const renderContent = () => {
    if (currentEntry === undefined)
      return (
        <div>Select an existing or create a new entry to get started!</div>
      );
    return isEditView ? (
      <TextArea onChange={updateContent} value={content} autoSize />
    ) : (
      <ReactMarkdown source={content} />
    );
  };

  return <div className={styles.entry}>{renderContent()}</div>;
}
