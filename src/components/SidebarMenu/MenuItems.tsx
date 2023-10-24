"use client";

import { ElementType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Binoculars, ChartLineUp, SignIn, User } from "phosphor-react";
import styles from "./menu-items.module.css";

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

export default function MenuItems() {
  return (
    <>
      <div className={styles.menuItems}>
        <MenuItem href="home" text="Início" icon={ChartLineUp} />
        <MenuItem href="explore" text="Explorar" icon={Binoculars} />
        <MenuItem href="profile" text="Perfil" icon={User} />
      </div>
      <div className={styles.bottomMenuItems}>
        <Link href="login" className={styles.bottomMenuItem}>
          Fazer Login
          <SignIn size={24} />
        </Link>
      </div>
    </>
  );
}
