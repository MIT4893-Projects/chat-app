import { User } from "@prisma/client";
import { generate, verify } from "..";

export async function getUserToken(user: User) {
  return await generate(user);
}

export async function verifyUserToken(token: string) {
  return await verify(token);
}
