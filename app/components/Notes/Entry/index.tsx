import React, { ChangeEvent, useEffect, useState } from 'react';
import find from 'lodash/find';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import hljs from 'highlight.js';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Layout, Empty } from 'antd';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mkdCheckBox from 'markdown-it-checkbox';
import mkdAnchor from 'markdown-it-anchor';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mkdToc from 'markdown-it-table-of-contents';
import styles from './styles.scss';
import { useDebouncedEffect, usePrevious } from '../../../hooks';
import newNotesClient from '../../../clients/notes';
import { refreshEntryTitle } from '../../../state/notes/actions';

const { Content } = Layout;

const mdParser = new MarkdownIt({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
        // eslint-disable-next-line no-empty
      } catch (_) {}
    }

    return ''; // use external default escaping
  },
  html: true,
  linkify: true,
  typographer: true,
  langPrefix: 'language-'
});
mdParser.use(mkdCheckBox);
mdParser.use(mkdAnchor);
mdParser.use(mkdToc);

type Props = {
  entries?: EntryType[];
  currentEntryID: number;
  currentBookID: number;
};

export default function Entry({
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
    if (currentEntryID === 0) {
      setContent('');
    }
  }, [currentEntryID]);

  const updateContent = ({ text }: any) => {
    setContent(text);
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
    return (
      <MdEditor
        value={content}
        style={{ height: '100%' }}
        renderHTML={text => mdParser.render(text)}
        onChange={updateContent}
      />
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
      {renderContent()}
    </Content>
  );
}
