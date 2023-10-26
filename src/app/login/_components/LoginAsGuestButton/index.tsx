"use client";

import { Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";

type LoginAsGuestButtonProps = ComponentProps<"button">;

export default function LoginAsGuestButton({
  ...props
}: LoginAsGuestButtonProps) {
  const { push } = useRouter();

  function handleLoginAsGuest() {
    push("/home");
  }

  return (
    <button onClick={handleLoginAsGuest} type="button" {...props}>
      <Rocket />
      Acessar como visitante
    </button>
  );
}
