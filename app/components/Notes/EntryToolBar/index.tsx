import React from 'react';
import { Button } from 'antd';
import styles from './styles.scss';

type Props = {
  onToggleView(): void;
};

export default function EntryToolBar({ onToggleView }: Props) {
  return (
    <div className={styles['entry-toolbar']}>
      <Button type="primary" onClick={() => onToggleView()}>
        Toggle View
      </Button>
    </div>
  );
}
