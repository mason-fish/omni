import React, { ReactNode } from 'react';
import { Layout } from 'antd';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  return (
    <Layout style={{ background: 'none', height: '100%' }}>{children}</Layout>
  );
}
