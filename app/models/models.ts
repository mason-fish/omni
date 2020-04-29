interface Book extends Base {
  ID: number;
  name: string;
}

interface Entry extends Base {
  title: string;
  content: string;
}

interface Base {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
}
