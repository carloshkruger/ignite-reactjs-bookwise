"use client";

import { Binoculars } from "phosphor-react";
import styles from "./page-title.module.css";

export default function PageTitle() {
  return (
    <div className={styles.container}>
      <Binoculars size={32} />
      <h1>Explorar</h1>
    </div>
  );
}
