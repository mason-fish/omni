import React from 'react';
import find from 'lodash/find';
import get from 'lodash/get';
import styles from './styles.scss';

type Props = {
  entries?: EntryType[];
  currentEntryID: number;
};

export default function Entry({ entries, currentEntryID }: Props) {
  const currentEntry = get(
    find(entries, ent => {
      return ent.ID === currentEntryID;
    }),
    ['content'],
    ''
  );
  return (
    <div className={styles.entry}>
      <p>{currentEntry || 'Select an entry to get started!'}</p>
    </div>
  );
}
