import Link from "next/link";
import {
  Binoculars,
  ChartLineUp,
  SignIn,
  User,
} from "@/components/PhosphorIcons";
import MenuItem from "../MenuItem";
import SignOutButton from "../SignOutButton";
import styles from "./styles.module.css";

type MenuItemsProps = {
  isUserAuthenticated: boolean;
};

export default function MenuItems({ isUserAuthenticated }: MenuItemsProps) {
  return (
    <>
      <div className={styles.menuItems}>
        <MenuItem href="home" text="Início" icon={ChartLineUp} />
        <MenuItem href="explore" text="Explorar" icon={Binoculars} />
        {isUserAuthenticated && (
          <MenuItem href="profile" text="Perfil" icon={User} />
        )}
      </div>
      <div className={styles.bottomMenuItems}>
        {isUserAuthenticated ? (
          <SignOutButton />
        ) : (
          <Link href="login" className={styles.bottomMenuItem}>
            Fazer Login
            <SignIn size={24} />
          </Link>
        )}
      </div>
    </>
  );
}
