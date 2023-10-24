import { Rocket } from "lucide-react";
import styles from "./login.module.css";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Login() {
  return (
    <div className={styles.main}>
      <div className={styles.leftPanel}>
        <Logo size="4xl" />
      </div>
      <div className={styles.loginOptionsContainer}>
        <div>
          <h1>Boas vindas!</h1>
          <p>Faça seu login ou acesse como visitante.</p>
          <Link href="/home?guest=true" className={styles.loginOptionButton}>
            <Rocket />
            Acessar como visitante
          </Link>
        </div>
      </div>
    </div>
  );
}
