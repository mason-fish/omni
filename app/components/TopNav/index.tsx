import React from 'react';
import styles from './TopNav.scss';

export default function TopNav() {
  return (
    <nav className={styles['top-nav']}>
      <ul>
        <li>Top Nav Item ONE</li>
        <li>Top Nav Item TWO</li>
        <li>Top Nav Item THREE</li>
      </ul>
    </nav>
  );
}
