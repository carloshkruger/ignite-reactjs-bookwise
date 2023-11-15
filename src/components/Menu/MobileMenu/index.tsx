"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import MenuItems from "../MenuItems";

import styles from "./styles.module.css";

type MobileMenuProps = {
  isUserAuthenticated: boolean;
};

export default function MobileMenu({ isUserAuthenticated }: MobileMenuProps) {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen((state) => !state);
  }

  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  return (
    <>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <Menu />
      </button>
      <div className={`${styles.menuModal} ${isOpen && styles.open}`}>
        <button className={styles.closeMenuButton} onClick={toggleMenu}>
          <X size={32} />
        </button>
        <div className={styles.menuModalContent}>
          <MenuItems isUserAuthenticated={isUserAuthenticated} />
        </div>
      </div>
    </>
  );
}
