import { useState, useEffect, useContext, createContext } from "react";
import { User } from "./@types/auth";
import firebase from "./firebase";
import { createUser } from "./firestore";

interface AuthContextData {
  user: User;
  signInWithGithub(): Promise<User | undefined>;
  signOut(): Promise<void>;
}

const initialAuthData: AuthContextData = undefined;
const AuthContext = createContext(initialAuthData);

function useProvideAuth(): AuthContextData {
  const [user, setUser] = useState<User | undefined>(undefined);

  const signInWithGithub = async () => {
    const response = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider());

    const currentUser = handleUser(response.user);
    createUser(currentUser);
    return currentUser;
  };

  const signOut = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(undefined);
      });
  };

  const handleUser = (rawUser?: firebase.User): User | undefined => {
    if (rawUser) {
      console.log(rawUser.displayName);
      const formattedUser = formatUser(rawUser);
      setUser(formattedUser);
      return formattedUser;
    } else {
      setUser(undefined);
      return undefined;
    }
  };

  const formatUser = (rawUser: firebase.User) => ({
    uid: rawUser.uid,
    email: rawUser.email,
    name: rawUser.displayName,
    provider: rawUser.providerData[0].providerId,
    photoUrl: rawUser.photoURL
  });

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user: firebase.User) => {
        handleUser(user);
      });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signOut,
    signInWithGithub
  };
}

export default function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
