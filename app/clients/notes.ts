interface NotesClient {
  host: string;
  listBooks(): Promise<BookType[]>;
  listEntriesForBook(bookID: number): Promise<EntryType[]>;
  updateEntry(bookID: number, entryID: number, data: {}): Promise<EntryType>;
  getEntryByID(bookID: number, entryID: number): Promise<EntryType>;
  createBook(name: string): Promise<BookType>;
  createEntryForBook(bookID: number, title: string): Promise<EntryType>;
  deleteBook(bookID: number): Promise<void>;
  deleteBookEntry(bookID: number, entryID: number): Promise<void>;
}

enum Method {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

const doFetch = async (
  url: string,
  method: Method,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const body = data ? JSON.stringify(data) : '';

  const opts: RequestInit = {
    method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body
  };

  if (!body) delete opts.body;

  const response = await fetch(url, opts);

  return response.json();
};

export default function newNotesClient(
  host = 'http://localhost:8080'
): NotesClient {
  return {
    host,
    listBooks: (): Promise<BookType[]> => {
      const url = `${host}/books`;
      return doFetch(url, Method.GET).then(res => res.data);
    },
    listEntriesForBook(bookID: number): Promise<EntryType[]> {
      const url = `${host}/books/${bookID}/entries`;
      return doFetch(url, Method.GET).then(res => res.data);
    },
    updateEntry(
      bookID: number,
      entryID: number,
      data: EntryType
    ): Promise<EntryType> {
      const url = `${host}/books/${bookID}/entries/${entryID}`;
      return doFetch(url, Method.PATCH, { ...data }).then(res => res.data);
    },
    getEntryByID(bookID: number, entryID: number): Promise<EntryType> {
      const url = `${host}/books/${bookID}/entries/${entryID}`;
      return doFetch(url, Method.GET).then(res => res.data);
    },
    createBook(name: string): Promise<BookType> {
      const url = `${host}/books`;
      return doFetch(url, Method.POST, { name }).then(res => res.data);
    },
    createEntryForBook(bookID: number, title: string): Promise<EntryType> {
      const url = `${host}/books/${bookID}/entries`;
      return doFetch(url, Method.POST, { title }).then(res => res.data);
    },
    deleteBook(bookID: number): Promise<void> {
      const url = `${host}/books/${bookID}`;
      return doFetch(url, Method.DELETE).then(() => Promise.resolve(undefined));
    },
    deleteBookEntry(bookID: number, entryID: number): Promise<void> {
      const url = `${host}/books/${bookID}/entries/${entryID}`;
      return doFetch(url, Method.DELETE).then(() => Promise.resolve(undefined));
    }
  };
}
