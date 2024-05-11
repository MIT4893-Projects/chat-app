"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./styles.module.css";

export default function LoginForm() {
  const router = useRouter();

  return (
    <>
      <form className={styles["login-form"]}>
        <Input variant="outline" type="text" placeholder="Username" />
        <Input variant="outline" type="password" placeholder="Password" />
        <Button
          variant="outline"
          type="button"
          onClick={() => router.push("/chat")}
        >
          Sign in
        </Button>
      </form>

      <p className="text-center">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-sky-500 hover:underline underline-offset-4"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
