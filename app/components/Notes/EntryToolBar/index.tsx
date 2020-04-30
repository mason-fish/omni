import React from 'react';
import styles from './styles.scss';

export default function EntryToolBar() {
  return (
    <div className={styles['entry-toolbar']}>
      <ul>
        <li>Entry 1</li>
        <li>Entry 2</li>
        <li>Entry 3</li>
      </ul>
    </div>
  );
}
