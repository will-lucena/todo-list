import type { TodoListItem, User } from '.';
import { Api } from './Api';
import type { TaskGroup } from './TaskGroup';

export class LocalStorageApi implements Api{
  db: TodoListItem[] = []

  addToCollection(item: TodoListItem): void {
    this.db.push(item)
    this.syncDatabase()
  }

  updateCollectionItem(item: TodoListItem): void {
    const index = this.db.findIndex(el => el.key === item.key)
    Object.assign(this.db[index], item) 
    this.syncDatabase()
  }

  sanitizeObject(item: any): Object {
    return {}
  }

  getCollection(collectionId: string): Promise<TodoListItem[]> {
    return new Promise((resolve) => {
      if (this.db.length === 0){
        const stringifiedDatabase = localStorage.getItem('todoDB') || '[]'
        const database = JSON.parse(stringifiedDatabase);
        this.db = [...database]
      }
      resolve(this.db)
    })
  }

  removeFromCollection(key: string): void {
    const index = this.db.findIndex(el => el.key === key)
    this.db.splice(index, 1)
    this.syncDatabase()
  }

  upsertUsersBase(user: User): void {
    return
  }

  getFriends(email: string): Promise<string[]> {
    return new Promise((resolve) => {
      resolve([])
    })
  }

  getTaskGroups(email: string): Promise<TaskGroup[]> {
    return new Promise((resolve) => {
      resolve([])
    })
  }

  private syncDatabase(){
    localStorage.setItem( 'todoDB', JSON.stringify( this.db ) );
  }
}