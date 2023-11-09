import SidebarMenu from "@/components/SidebarMenu";

import styles from "./layout.module.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.main}>
      <SidebarMenu />
      {children}
    </div>
  );
}
