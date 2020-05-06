import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import styles from './styles.scss';

const { Content } = Layout;

type Props = {
  children: ReactNode;
};

export default function AppContentWrapper(props: Props) {
  const { children } = props;
  return (
    <Content className={styles['app-content-wrapper']}>{children}</Content>
  );
}
