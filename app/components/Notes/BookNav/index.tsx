import React from 'react';
import styles from './styles.scss';

type Props = {
  books?: BookType[];
  currentBookID: number;
  onSelectBook(bookID: number): void;
};

export default function BookNav({ books, currentBookID, onSelectBook }: Props) {
  const renderBooks = (bks: BookType[]) => {
    return bks.map(bk => {
      const { name, ID } = bk;
      return (
        // TODO: Turn ESLint back on and fix this bullshit
        <li key={ID}>
          <div
            role="button"
            onClick={() => onSelectBook(ID)}
            onKeyDown={() => {}}
            tabIndex={0}
          >
            {ID === currentBookID ? `*${name}` : `${name}`}
          </div>
        </li>
      );
    });
  };

  return (
    <div className={styles['book-nav']}>
      <ul>{books && renderBooks(books)}</ul>
    </div>
  );
}
