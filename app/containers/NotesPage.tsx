import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import Notes from '../components/Notes';
import notes from '../state/notes/selectors';
import { setCurrentBookID, setCurrentEntryID } from '../state/notes/actions';
import {
  FetchEntriesForBook,
  FetchEntryByID,
  initNotes
} from '../state/notes/flows';

export default function NotesPage() {
  const books = useSelector(notes.listBooks());
  const currentBookID = useSelector(notes.getCurrentBookID());
  const entries = useSelector(notes.listEntriesForBook(currentBookID));
  const currentEntryID = useSelector(notes.getCurrentEntryID(currentBookID));

  const dispatch = useDispatch();

  const onSelectEntry = (bookID: number, entryID: number) => {
    dispatch(setCurrentEntryID(bookID, entryID));
    dispatch(FetchEntryByID(bookID, entryID));
  };

  const onSelectBook = (bookID: number) => {
    dispatch(FetchEntriesForBook(bookID));
    dispatch(setCurrentBookID(bookID));
  };

  useEffect(() => {
    dispatch(initNotes());
  }, []);

  // return <Notes books={books} />;
  return (
    <Notes
      books={books}
      entries={entries}
      currentBookID={currentBookID}
      currentEntryID={currentEntryID}
      onSelectBook={onSelectBook}
      onSelectEntry={onSelectEntry}
    />
  );
}
