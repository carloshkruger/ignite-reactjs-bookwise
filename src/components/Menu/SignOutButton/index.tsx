"use client";

import { signOut } from "next-auth/react";
import { SignOut } from "@/components/PhosphorIcons";
import styles from "./styles.module.css";

export default function SignOutButton() {
  async function handleSignOut() {
    await signOut();
  }

  return (
    <button onClick={handleSignOut} className={styles.signOutButton}>
      Deslogar
      <SignOut size={24} />
    </button>
  );
}
