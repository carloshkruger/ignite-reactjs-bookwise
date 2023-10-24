import Logo from "@/components/Logo";
import styles from "./home.module.css";
import MenuItems from "./MenuItems";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.menuContainer}>
        <Logo />
        <MenuItems />
      </div>
      <div className={styles.content}></div>
      <div>populares</div>
    </div>
  );
}
