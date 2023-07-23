import type { TodoListItem, User } from '.';
import { FirebaseApi } from './FirebaseApi';
import { LocalStorageApi } from './LocalstorageApi';
import type { TaskGroup } from './TaskGroup';

export abstract class Api {
  protected static INSTANCE: Api

  abstract addToCollection(item: TodoListItem): void
  abstract updateCollectionItem (item: TodoListItem): void
  abstract sanitizeObject(item: any): Object
  abstract getCollection(collectionId: string): Promise<TodoListItem[]>
  abstract removeFromCollection(key: string): void
  abstract upsertUsersBase(user: User): void
  abstract getFriends(email: string): Promise<string[]>
  abstract getTaskGroups(email: string): Promise<TaskGroup[]>

  public static setInstance(instance: APIs){
    const map = {
      FIREBASE: new FirebaseApi(),
      LOCALSTORAGE: new LocalStorageApi()
    }

    Api.INSTANCE = map[instance]
  }

  public static getInstance(): Api {
    return Api.INSTANCE
  }
}

export enum APIs{
  FIREBASE = 'FIREBASE',
  LOCALSTORAGE = 'LOCALSTORAGE'
}