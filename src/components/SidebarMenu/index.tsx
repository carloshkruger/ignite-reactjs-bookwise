import Logo from "../Logo";
import MenuItems from "./MenuItems";
import styles from "./sidebar-menu.module.css";

export default function SidebarMenu() {
  return (
    <div className={styles.menuContainer}>
      <Logo />
      <MenuItems />
    </div>
  );
}
