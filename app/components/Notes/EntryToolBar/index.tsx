import React from 'react';
import { Button } from 'antd';
import styles from './styles.scss';

type Props = {
  onToggleView(): void;
  isEditView: boolean;
  currentEntryID: number;
};

export default function EntryToolBar({
  currentEntryID,
  onToggleView,
  isEditView
}: Props) {
  return (
    <div className={styles['entry-toolbar']}>
      <Button
        disabled={currentEntryID === 0}
        type="primary"
        onClick={() => onToggleView()}
      >
        {isEditView ? 'Markdown Mode' : 'Edit Mode'}
      </Button>
    </div>
  );
}
