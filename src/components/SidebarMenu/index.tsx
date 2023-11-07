import { getServerSession } from "next-auth";
import Logo from "../Logo";
import MenuItems from "./MenuItems";
import styles from "./styles.module.css";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function SidebarMenu() {
  const session = await getServerSession(nextAuthOptions);

  const isUserAuthenticated = !!session?.user;

  return (
    <div className={styles.menuContainer}>
      <Logo />
      <MenuItems isUserAuthenticated={isUserAuthenticated} />
    </div>
  );
}
