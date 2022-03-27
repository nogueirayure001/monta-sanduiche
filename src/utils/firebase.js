import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-PUIRK1twRcWv8VZCT_yNi6uF-rDv2UI",
  authDomain: "monta-sanduiche-76a84.firebaseapp.com",
  projectId: "monta-sanduiche-76a84",
  storageBucket: "monta-sanduiche-76a84.appspot.com",
  messagingSenderId: "577419446018",
  appId: "1:577419446018:web:eeed828a41513913b6e41b",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
auth.useDeviceLanguage();

const provider = new GoogleAuthProvider();

// functions
export const signUpUser = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    await updateProfile(user, { displayName: name });
  } catch (error) {
    return error.message;
  }
};

export const signInUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error.message;
  }
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const signUserWithGooglePopUp = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    return error.message;
  }
};
