import SidebarMenu from "@/components/Menu/SidebarMenu";
import MobileMenu from "@/components/Menu/MobileMenu";
import { getLoggedUserInfo } from "@/utils/getLoggedUserInfo";
import styles from "./layout.module.css";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loggedUser = await getLoggedUserInfo();
  const isUserAuthenticated = !!loggedUser;

  return (
    <div className={styles.main}>
      <MobileMenu isUserAuthenticated={isUserAuthenticated} />
      <div className={styles.mainContent}>
        <SidebarMenu isUserAuthenticated={isUserAuthenticated} />
        {children}
      </div>
    </div>
  );
}
