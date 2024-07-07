import React from "react";
import styles from "./Spinner1.module.css";

export default function Spinner1() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.loader}></span>
    </div>
  );
}
