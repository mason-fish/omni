interface BookType extends BaseType {
  name: string;
}

interface EntryType extends BaseType {
  title: string;
  content: string;
}

interface BaseType {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
}
