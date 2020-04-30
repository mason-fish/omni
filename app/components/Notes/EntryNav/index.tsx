import React from 'react';
import styles from './styles.scss';

type Props = {
  entries?: EntryType[];
  currentBookID: number;
  currentEntryID: number;
  onSelectEntry(bookID: number, entryID: number): void;
};

export default function EntryNav({
  entries,
  currentEntryID,
  currentBookID,
  onSelectEntry
}: Props) {
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

  return (
    <div className={styles['entry-nav']}>
      <ul>{renderEntryTitles(entries)}</ul>
    </div>
  );
}
