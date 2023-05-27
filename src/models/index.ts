interface TodoListItem {
  label: string;
  completed?: boolean;
  key: string;
  sharedWith?: Array<string>;
}
interface User {
  uid: string | null;
  friends?: Array<string> | null;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}

export type { TodoListItem, User };
