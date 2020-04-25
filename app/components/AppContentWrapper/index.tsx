import React, { ReactNode } from 'react';
import styles from './styles.scss';

type Props = {
  children: ReactNode;
};

export default function AppContentWrapper(props: Props) {
  const { children } = props;
  return <div className={styles['app-content-wrapper']}>{children}</div>;
}
