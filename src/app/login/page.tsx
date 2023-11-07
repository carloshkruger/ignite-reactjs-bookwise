import styles from "./styles.module.css";
import Logo from "@/components/Logo";
import LoginAsGuestButton from "./_components/LoginAsGuestButton";
import GitHubLoginButton from "./_components/GitHubLoginButton";
import { redirect } from "next/navigation";
import { getLoggedUserInfo } from "@/utils/getLoggedUserInfo";

export default async function Login() {
  const loggedUser = await getLoggedUserInfo();

  if (loggedUser) {
    return redirect("/home");
  }

  return (
    <div className={styles.main}>
      <div className={styles.leftPanel}>
        <Logo size="4xl" />
      </div>
      <div className={styles.loginOptionsContainer}>
        <div>
          <h1>Boas vindas!</h1>
          <p>Faça seu login ou acesse como visitante.</p>
          <GitHubLoginButton className={styles.loginOptionButton} />
          <LoginAsGuestButton className={styles.loginOptionButton} />
        </div>
      </div>
    </div>
  );
}
