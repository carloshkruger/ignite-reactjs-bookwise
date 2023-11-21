"use client";

import { ElementType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./styles.module.css";

type MenuItemProps = {
  href: string;
  text: string;
  icon: ElementType;
};

export default function MenuItem({ href, text, icon: Icon }: MenuItemProps) {
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
