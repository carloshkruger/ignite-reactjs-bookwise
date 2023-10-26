import { getServerSession } from "next-auth";
import Logo from "../Logo";
import MenuItems from "./MenuItems";
import styles from "./sidebar-menu.module.css";

export default async function SidebarMenu() {
  const session = await getServerSession();

  const isUserAuthenticated = !!session?.user;

  return (
    <div className={styles.menuContainer}>
      <Logo />
      <MenuItems isUserAuthenticated={isUserAuthenticated} />
    </div>
  );
}
