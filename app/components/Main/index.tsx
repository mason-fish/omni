import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import styles from './Main.css';

export default function Main() {
  return (
    <div className={styles.container} data-tid="container">
      <h2>Main</h2>
      <Link to={routes.JOURNAL}>to Journal</Link>
    </div>
  );
}
