import { Metadata } from "next";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import LoginAsGuestButton from "./_components/LoginAsGuestButton";
import GitHubLoginButton from "./_components/GitHubLoginButton";
import { getLoggedUserInfo } from "@/utils/getLoggedUserInfo";
import styles from "./styles.module.css";

export const metadata: Metadata = {
  title: "BookWise | Login",
};

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
