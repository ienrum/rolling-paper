import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import styles from "./AppRouter.module.css";

import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

import { User } from "firebase/auth";

interface Props {
  isLoggedIn: boolean;
  userObj: User | undefined;
}

export default ({ isLoggedIn, userObj }: Props) => {
  return (
    <div className={styles.container}>
      <Router>
        {isLoggedIn && <Navigation />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home userObj={userObj} />} />
              <Route path="/profile" element={<Profile />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Auth />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
};
