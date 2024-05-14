import { User } from "@prisma/client";
import { generate, verify } from "..";

export function getUserToken(user: User) {
  return generate({ object: user });
}

export function verifyUserToken(token: string) {
  return verify(token);
}
