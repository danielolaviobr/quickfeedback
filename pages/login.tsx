import React, { useCallback, useEffect } from "react";
import firebase from "@lib/firebase";
import { useRouter } from "next/router";
import useAuth from "@lib/auth";

const Login = () => {
  const router = useRouter();
  const { signInWithEmail } = useAuth();

  const run = async () => {
    await signInWithEmail();
    router.push("/sites");
  };

  useEffect(() => {
    run();
  }, []);
  return <div>Loading</div>;
};

export default Login;
