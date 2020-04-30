interface NotesClient {
  host: string;
  listBooks(): Promise<BookType[]>;
  listEntriesForBook(bookID: number): Promise<EntryType[]>;
}

enum Method {
  GET = 'GET',
  POST = 'POST'
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

export default function newNotesClient(host: string): NotesClient {
  return {
    host,
    listBooks: (): Promise<BookType[]> => {
      const url = `${host}/books`;
      return doFetch(url, Method.GET).then(res => res.data);
    },
    listEntriesForBook(bookID: number): Promise<EntryType[]> {
      const url = `${host}/books/${bookID}/entries`;
      return doFetch(url, Method.GET).then(res => res.data);
    }
  };
}
