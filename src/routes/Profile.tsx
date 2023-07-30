import React from "react";

import { auth } from "../myBase";
import { signOut } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import styles from "./Profile.module.css";

const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
};

export default Profile;
