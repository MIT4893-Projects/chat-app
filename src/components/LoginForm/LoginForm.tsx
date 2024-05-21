"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useRef } from "react";
import axios from "axios";

import styles from "./styles.module.css";

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    return await axios
      .post("/api/auth/login", { email, password })
      .then((response) => {
        const token = response.data.payload?.token;

        if (token) {
          setCookie("token", token);
          router.push("/chat");
        } else {
          alert("Invalid email or password");
        }
      });
  };

  return (
    <>
      <form className={styles["login-form"]}>
        <Input
          variant="outline"
          type="text"
          placeholder="Email"
          ref={emailRef}
        />
        <Input
          variant="outline"
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />

        <Button variant="outline" type="button" onClick={handleLogin}>
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
