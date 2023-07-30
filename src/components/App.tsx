import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import { auth } from "../myBase";
import { User, onAuthStateChanged } from "firebase/auth";

import AppRouter from "./AppRouter";

function App() {
  const [init, setInit] = useState<boolean>(false);
  const [userObj, setUserObj] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(auth, (dbUser) => {
      setInit(false);
      if (dbUser) {
        setUserObj(dbUser);
      } else {
        setUserObj(undefined);
      }
      setInit(true);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Rolling Paper</h1>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
    </div>
  );
}

export default App;
