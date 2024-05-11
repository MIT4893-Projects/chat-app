"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";

import styles from "./styles.module.css";

export default function LoginForm() {
  const router = useRouter();

  return (
    <form className={styles["login-form"]}>
      <Input variant="outline" type="text" placeholder="Username" />
      <Button
        variant="outline"
        type="button"
        onClick={() => router.push("/chat")}
      >
        Login
      </Button>
    </form>
  );
}
