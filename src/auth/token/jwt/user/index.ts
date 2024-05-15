import { User } from "@prisma/client";
import { generate, verify } from "..";

export function getUserToken(user: User) {
  return generate({ object: user });
}

export async function verifyUserToken(token: string) {
  return verify(token) as User;
}
