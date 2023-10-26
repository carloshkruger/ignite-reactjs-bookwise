"use client";

import { ElementType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Binoculars, ChartLineUp, SignIn, SignOut, User } from "phosphor-react";
import styles from "./menu-items.module.css";
import { signOut } from "next-auth/react";

type MenuItemProps = {
  href: string;
  text: string;
  icon: ElementType;
};

function MenuItem({ href, text, icon: Icon }: MenuItemProps) {
  const pathName = usePathname();

  return (
    <Link
      href={href}
      className={`${styles.menuItem} ${
        pathName === `/${href}` ? styles.active : ""
      }`}
    >
      <Icon size={24} />
      {text}
    </Link>
  );
}

type MenuItemsProps = {
  isUserAuthenticated: boolean;
};

export default function MenuItems({ isUserAuthenticated }: MenuItemsProps) {
  async function handleSignOut() {
    await signOut();
  }

  return (
    <>
      <div className={styles.menuItems}>
        <MenuItem href="home" text="Início" icon={ChartLineUp} />
        <MenuItem href="explore" text="Explorar" icon={Binoculars} />
        <MenuItem href="profile" text="Perfil" icon={User} />
      </div>
      <div className={styles.bottomMenuItems}>
        {isUserAuthenticated ? (
          <button onClick={handleSignOut} className={styles.signOutButton}>
            Deslogar
            <SignOut size={24} />
          </button>
        ) : (
          <Link href="login" className={styles.bottomMenuItem}>
            Fazer Login
            <SignIn size={24} />
          </Link>
        )}
      </div>
    </>
  );
}
