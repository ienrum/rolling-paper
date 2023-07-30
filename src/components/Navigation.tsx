import React from "react";
import { Link } from "react-router-dom";

import styles from "./Navigation.module.css";

const Navigation = () => (
  <nav className={styles.container}>
    <ul>
      <li>
        <Link className={styles.link} to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className={styles.link} to="/profile">
          My Profile
        </Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
