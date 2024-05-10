import { User } from "@/types/user.types";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";

import styles from "./styles.module.css";

export default function UserChatLink({ id, name }: User) {
  return (
    <Link href={`/chat/${id}`}>
      <li className={styles["user-chat-link"]}>
        <FaUser />
        <p>{name}</p>
      </li>
    </Link>
  );
}
