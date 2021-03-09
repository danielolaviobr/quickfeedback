import { useState, useEffect, useContext, createContext } from "react";
import Cookies from "js-cookie";

import firebase from "./firebase";
import { User } from "./@types/auth";
import { createUser } from "./firestore";
import { useRouter } from "next/router";
interface AuthContextData {
  user: User;
  signInWithGitHub(): Promise<User | undefined>;
  signInWithGoogle(): Promise<User | undefined>;
  signOut(): Promise<void>;
}

const initialAuthData: AuthContextData = undefined;
const AuthContext = createContext(initialAuthData);

function useProvideAuth(): AuthContextData {
  const [user, setUser] = useState<User | undefined>(undefined);
  const { push } = useRouter();

  const signInWithGitHub = async () => {
    const response = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider());

    const currentUser = await handleUser(response.user);
    push("/dashboard");

    return currentUser;
  };
  const signInWithGoogle = async () => {
    const response = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());

    const currentUser = await handleUser(response.user);
    push("/dashboard");

    return currentUser;
  };

  const signOut = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(undefined);
        push("/");
      });
  };

  const handleUser = async (
    rawUser?: firebase.User
  ): Promise<User | undefined> => {
    if (rawUser) {
      const formattedUser = await formatUser(rawUser);
      const { token, ...userWithoutToken } = formattedUser;
      createUser(userWithoutToken);

      setUser(formattedUser);
      Cookies.set("QuickFeedback-auth", "true", { expires: 1 });
      return formattedUser;
    } else {
      Cookies.remove("QuickFeedback-auth");
      setUser(undefined);
      return undefined;
    }
  };

  const formatUser = async (user: firebase.User): Promise<User> => {
    const decodedToken = await firebase
      .auth()
      .currentUser.getIdTokenResult(true);

    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      provider: user.providerData[0].providerId,
      photoUrl: user.photoURL,
      token: await user.getIdToken(),
      stripeRole: decodedToken.claims.stripeRole
    };
  };

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
    signInWithGitHub,
    signInWithGoogle
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
