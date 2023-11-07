import Logo from "../Logo";
import MenuItems from "./MenuItems";
import styles from "./styles.module.css";
import { getLoggedUserInfo } from "@/utils/getLoggedUserInfo";

export default async function SidebarMenu() {
  const loggedUser = await getLoggedUserInfo();

  const isUserAuthenticated = !!loggedUser;

  return (
    <div className={styles.menuContainer}>
      <Logo />
      <MenuItems isUserAuthenticated={isUserAuthenticated} />
    </div>
  );
}
