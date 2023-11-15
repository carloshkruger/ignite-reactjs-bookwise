import Logo from "../../Logo";
import MenuItems from "../MenuItems";
import styles from "./styles.module.css";

type SidebarMenuProps = {
  isUserAuthenticated: boolean;
};

export default function SidebarMenu({ isUserAuthenticated }: SidebarMenuProps) {
  return (
    <div className={styles.menuContainer}>
      <Logo />
      <MenuItems isUserAuthenticated={isUserAuthenticated} />
    </div>
  );
}
