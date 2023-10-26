"use client";

import { User } from "phosphor-react";
import styles from "./styles.module.css";

export default function PageTitle() {
  return (
    <div className={styles.container}>
      <User size={32} />
      <h1>Perfil</h1>
    </div>
  );
}
