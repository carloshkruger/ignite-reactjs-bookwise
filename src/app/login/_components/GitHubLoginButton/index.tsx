"use client";

import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { ComponentProps } from "react";

type GitHubLoginButtonProps = ComponentProps<"button">;

export default function GitHubLoginButton({
  ...props
}: GitHubLoginButtonProps) {
  async function handleGitHubLogin() {
    await signIn("github", {
      callbackUrl: "/home",
    });
  }

  return (
    <button onClick={handleGitHubLogin} type="button" {...props}>
      <Github />
      Entrar com GitHub
    </button>
  );
}
