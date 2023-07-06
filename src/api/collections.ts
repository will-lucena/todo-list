import { TodoListItem, User } from "@/models";
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

import type { TaskGroup } from '@/models/TaskGroup';
import { updateDoc, writeBatch } from 'firebase/firestore';
import { currentUser } from '.';
import { app } from "./setup";
const db = getFirestore(app);

const addToCollection = async (item: TodoListItem) => {
  const payload = sanitizeObject(item);
  const collectionId = currentUser!.email!
  await setDoc(doc(db, collectionId, item.key), payload);
};

const updateCollectionItem = async (item: TodoListItem) => {
  const payload = sanitizeObject(item);
  const collectionId = currentUser!.email!
  await updateDoc(doc(db, collectionId, item.key), payload);
};

const batchUpdate = async(itemsToUpdate: Array<TodoListItem>) => {
  const batch = writeBatch(db)
  const collectionId = currentUser!.email!
  itemsToUpdate.forEach(item => {
    batch.update(doc(db, collectionId, item.key), {item})
  })
  batch.commit()
}

const batchRemove = async(itemsToRemove: Array<TodoListItem>) => {
  const batch = writeBatch(db)
  const collectionId = currentUser!.email!
  itemsToRemove.forEach(item => {
    batch.delete(doc(db, collectionId, item.key))
  })
  batch.commit()
}

const sanitizeObject = (item: any) => {
  const payload = {};
  Object.keys(item).forEach((key) => {
    if (item[key] !== undefined) {
      (payload as any)[key] = item[key];
    }
  });

  return payload;
};

const getCollection = async (collectionId: string) => {
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
};

const removeFromCollection = async (key: string) => {
  const collectionId = currentUser!.email!
  await deleteDoc(doc(db, collectionId, key));
};

const upsertUsersBase = async (user: User) => {
  await setDoc(doc(db, "users", user.getUserEmail()), user.toObject());
};

const getFriends = async (email: string) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  const docs = new Array<string>();

  querySnapshot.forEach((doc) => {
    doc.data().friends?.forEach((friend: string) => {
      docs.push(friend);
    });
  });
  return docs;
};

const getTaskGroups = async (email: string) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  const docs = new Array<TaskGroup>();

  querySnapshot.forEach((doc) => {
    doc.data().taskGroups?.forEach((taskGroup: TaskGroup) => {
      docs.push(taskGroup);
    });
  });
  return docs;
};

export {
  addToCollection, batchRemove, batchUpdate, getCollection, getFriends,
  getTaskGroups, removeFromCollection, updateCollectionItem, upsertUsersBase
};

