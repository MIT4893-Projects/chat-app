"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./styles.module.css";

export default function RegisterForm() {
  const router = useRouter();

  return (
    <>
      <form className={styles["register-form"]}>
        <Input variant="outline" type="text" placeholder="Username" />
        <Input variant="outline" type="email" placeholder="Email" />
        <Input variant="outline" type="password" placeholder="Password" />
        <Button
          variant="outline"
          type="button"
          onClick={() => router.push("/chat")}
        >
          Sign up
        </Button>
      </form>

      <p className="text-center">
        Already have an account?{" "}
        <Link
          href="/"
          className="text-sky-500 hover:underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
