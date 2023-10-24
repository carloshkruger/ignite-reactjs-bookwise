"use client";

import { ChartLineUp } from "phosphor-react";
import styles from "./page-title.module.css";

export default function PageTitle() {
  return (
    <div className={styles.container}>
      <ChartLineUp size={32} />
      <h1>Início</h1>
    </div>
  );
}
