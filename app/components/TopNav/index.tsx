import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { useLocation } from 'react-router';
import styles from './TopNav.scss';
import routes from '../../constants/routes.json';

const { Header } = Layout;

export default function TopNav() {
  const location = useLocation();
  return (
    <Header className={styles['top-nav']}>
      <div className={styles.logo}>OMNI</div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key={routes.MAIN}>
          <Link to={routes.MAIN}>Main</Link>
        </Menu.Item>
        <Menu.Item key={routes.NOTES}>
          <Link to={routes.NOTES}>Notes</Link>
        </Menu.Item>
        <Menu.Item key={routes.NEXT}>
          <Link to={routes.NEXT}>Next Project</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}
