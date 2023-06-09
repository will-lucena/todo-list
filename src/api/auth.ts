// Import the functions you need from the SDKs you need
import { User } from "@/models";
import { GoogleAuthProvider, browserLocalPersistence, signOut as firebaseSignOut, getAuth, setPersistence, signInWithPopup } from "firebase/auth";

import { useUserStore } from '@/stores/user';
import { getFriends, upsertUsersBase } from '.';
import { app } from "./setup";
const auth = getAuth(app);
auth.useDeviceLanguage();

await setPersistence(auth, browserLocalPersistence)

const provider = new GoogleAuthProvider();

const signIn = async (): Promise<User> => {
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

    const friends = await getFriends(email!)
    
    const localUser = new User(
      uid,
      email!,
      displayName,
      photoURL,
      friends
    )

    useUserStore().updateUser(localUser)

    upsertUsersBase(user)
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

export { signIn, currentUser, signOut };
