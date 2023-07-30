import React, { useState } from "react";

import { auth, firebaseInstance } from "../myBase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import styles from "./Auth.module.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const onChange = (event: any) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const onSocialClick = async (event: any) => {
    const {
      target: { name },
    } = event;
    let provider: any;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }
    const data = await signInWithPopup(auth, provider);
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        {error}
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
      </form>

      <div>
        <button className={styles.signIn} onClick={toggleAccount}>
          {newAccount ? "Sign In" : "Create Account"}
        </button>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
