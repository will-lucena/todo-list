import type { TodoListItem, User } from '.';
import { Api } from './Api';
import type { TaskGroup } from './TaskGroup';

export class LocalStorageApi implements Api{
  addToCollection(item: TodoListItem): void {
    throw new Error('Method not implemented.');
  }
  updateCollectionItem(item: TodoListItem): void {
    throw new Error('Method not implemented.');
  }
  sanitizeObject(item: any): Object {
    throw new Error('Method not implemented.');
  }
  getCollection(collectionId: string): Promise<TodoListItem[]> {
    return new Promise(() => {
      return []
    })
  }
  removeFromCollection(key: string): void {
    throw new Error('Method not implemented.');
  }
  upsertUsersBase(user: User): void {
    throw new Error('Method not implemented.');
  }
  getFriends(email: string): Promise<string[]> {
    return new Promise(() => {
      return []
    })
  }
  getTaskGroups(email: string): Promise<TaskGroup[]> {
    throw new Error('Method not implemented.');
  }

}