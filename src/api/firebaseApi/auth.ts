// Import the functions you need from the SDKs you need
import { User } from "@/models";
import { GoogleAuthProvider, browserLocalPersistence, signOut as firebaseSignOut, getAuth, setPersistence, signInWithPopup } from "firebase/auth";

import { Api } from '@/models/Api';
import { TaskGroup } from '@/models/TaskGroup';
import { useUserStore } from '@/stores/user';
import { app } from "./setup";
const auth = getAuth(app);
auth.useDeviceLanguage();

await setPersistence(auth, browserLocalPersistence)

const provider = new GoogleAuthProvider();

const login = async (): Promise<Boolean> => {
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const firebaseUser = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    const { uid, email, displayName, photoURL } = firebaseUser;
    currentUser = auth.currentUser

    const friends = await Api.INSTANCE.getFriends(email!)
    const taskGroups = await Api.INSTANCE.getTaskGroups(email!)
    
    const localUser = new User(
      uid,
      email!,
      displayName,
      photoURL,
      friends,
      taskGroups
    )

    useUserStore().updateUser(localUser)
    return Promise.resolve(true);
  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    throw error;
  }
};

const createAccount = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const firebaseUser = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    const { uid, email, displayName, photoURL } = firebaseUser;
    currentUser = auth.currentUser

    const user = new User(uid, email!, displayName, photoURL)
    user.addGroup(new TaskGroup('Minhas Tarefas', TaskGroup.PERSONAL_GROUP_ID))
    user.addGroup(new TaskGroup('Compartilhadas comigo', TaskGroup.SHARED_WITH_ME_GROUP_ID))

    useUserStore().updateUser(user)
    return Promise.resolve(user);
  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    throw error;
  }
};


const signOut = async(): Promise<boolean> => {
  try {
    await firebaseSignOut(auth)
    return Promise.resolve(true)
  } catch (error) {
    console.error(error)
    throw error
  }
}

let currentUser = auth.currentUser

export { createAccount, currentUser, login, signOut };

