import { User } from "@/types/user.types";
import { users } from "@/lib/placeholder-data";

export default async function fetchConnectedUsers(): Promise<User[]> {
  return users;
}
