import type { TodoListItem, User } from "@/models";
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

import { currentUser } from '.';
import { app } from "./setup";
const db = getFirestore(app);

const addToCollection = async (item: TodoListItem) => {
  const payload = sanitizeObject(item);
  const collectionId = currentUser!.uid
  await setDoc(doc(db, collectionId, item.key), payload);
};

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
    const { key, label, completed, sharedWith } = doc.data();
    docs.push({
      key,
      label,
      completed,
      sharedWith,
    });
  });
  return docs;
};

const removeFromCollection = async (key: string) => {
  const collectionId = currentUser!.uid
  await deleteDoc(doc(db, collectionId, key));
};

const upsertUsersBase = async (user: User) => {
  await setDoc(doc(db, "users", user.uid!), user);
};

const getFriends = async (uid: string) => {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  const docs = new Array<string>();

  querySnapshot.forEach((doc) => {
    doc.data().friends?.forEach((friend: string) => {
      docs.push(friend);
    });
  });
  return docs;
};

export {
  addToCollection,
  getCollection,
  removeFromCollection,
  upsertUsersBase,
  getFriends,
};
