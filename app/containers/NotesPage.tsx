import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import Notes from '../components/Notes';
import notes from '../state/notes/selectors';
import { FetchBooks } from '../state/notes/actions';

export default function NotesPage() {
  const books = useSelector(notes.listBooks());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchBooks());
  }, []);

  // return <Notes books={books} />;
  return <Notes books={books} />;
}
