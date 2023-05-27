// Import the functions you need from the SDKs you need
import type { User } from "@/models";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { app } from "./setup";
const auth = getAuth(app);
auth.useDeviceLanguage();

const provider = new GoogleAuthProvider();

const signIn = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    const { uid, email, displayName, photoURL } = user;
    return Promise.resolve({ uid, email, displayName, photoURL });
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

export { signIn };
