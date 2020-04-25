import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TopNav.scss';
import routes from '../../constants/routes.json';

export default function TopNav() {
  return (
    <nav className={styles['top-nav']}>
      <ul>
        <Link to={routes.MAIN}>
          <li>Main</li>
        </Link>
        <Link to={routes.JOURNAL}>
          <li>Journal</li>
        </Link>
        <Link to={routes.NEXT}>
          <li>Next Project</li>
        </Link>
      </ul>
    </nav>
  );
}
