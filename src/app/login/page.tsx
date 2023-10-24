import { Rocket } from "lucide-react";
import BookHeartIcon from "./BookHeartIcon";
import styles from "./login.module.css";
import Link from "next/link";

export default function Login() {
  return (
    <div className={styles.main}>
      <div className={styles.leftPanel}>
        <BookHeartIcon />
        <p>BookWise</p>
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
