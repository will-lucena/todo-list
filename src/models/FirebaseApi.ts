import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where
} from "firebase/firestore/lite";

import { currentUser } from '@/api/firebaseApi';
import { app } from "@/api/firebaseApi/setup";
import type { TodoListItem, User } from '.';
import { Api } from './Api';
import type { TaskGroup } from './TaskGroup';
const db = getFirestore(app);

export class FirebaseApi implements Api{

  async addToCollection(item: TodoListItem): Promise<void> {
    const payload = this.sanitizeObject(item);
    const collectionId = currentUser!.email!
    await setDoc(doc(db, collectionId, item.key), payload);
  }

  async updateCollectionItem(item: TodoListItem): Promise<void> {
    const payload = this.sanitizeObject(item);
    const collectionId = currentUser!.email!
    await setDoc(doc(db, collectionId, item.key), payload);
  }

  sanitizeObject(item: any): Object {
    const payload = {};
    Object.keys(item).forEach((key) => {
      if (item[key] !== undefined) {
        (payload as any)[key] = item[key];
      }
    });

    return payload;
  }

  async getCollection(collectionId: string): Promise<TodoListItem[]> {
    const q = query(collection(db, collectionId));
    const querySnapshot = await getDocs(q);
    const docs = new Array<TodoListItem>();
    querySnapshot.forEach((doc) => {
      const { key, label, completed, sharedWith, taskGroupId } = doc.data();
      docs.push({
        key,
        label,
        completed,
        sharedWith,
        taskGroupId
      });
    });
    return docs;
  }

  async removeFromCollection(key: string): Promise<void> {
    const collectionId = currentUser!.email!
    await deleteDoc(doc(db, collectionId, key));
  }

  async upsertUsersBase(user: User): Promise<void> {
    await setDoc(doc(db, "users", user.getUserEmail()), user.toObject());
  }

  async getFriends(email: string): Promise<string[]> {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    const docs = new Array<string>();

    querySnapshot.forEach((doc) => {
      doc.data().friends?.forEach((friend: string) => {
        docs.push(friend);
      });
    });
    return docs;
  }

  async getTaskGroups(email: string): Promise<TaskGroup[]> {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    const docs = new Array<TaskGroup>();

    querySnapshot.forEach((doc) => {
      doc.data().taskGroups?.forEach((taskGroup: TaskGroup) => {
        docs.push(taskGroup);
      });
    });
    return docs;
  }
}