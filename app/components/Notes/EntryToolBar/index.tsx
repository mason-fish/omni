import React from 'react';
import { Button } from 'antd';
import styles from './styles.scss';

type Props = {
  onToggleView(): void;
  isEditView: boolean;
};

export default function EntryToolBar({ onToggleView, isEditView }: Props) {
  return (
    <div className={styles['entry-toolbar']}>
      <Button type="primary" onClick={() => onToggleView()}>
        {isEditView ? 'Markdown Mode' : 'Edit Mode'}
      </Button>
    </div>
  );
}
