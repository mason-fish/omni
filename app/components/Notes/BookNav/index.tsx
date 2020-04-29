import React from 'react';
import styles from './styles.scss';

type Props = {
  books?: Book[];
};

export default function BookNav(props: Props) {
  const { books } = props;
  const renderBooks = (bks: Book[]) => {
    return bks.map(bk => {
      const { name, ID } = bk;
      return <li key={ID}>{name}</li>;
    });
  };

  return (
    <div className={styles['book-nav']}>
      <ul>{books && renderBooks(books)}</ul>
    </div>
  );
}
