import { User } from "@prisma/client";
import { verifyUserToken } from "@/auth/token/jwt/user";

export default class UserEntity implements User {
  id: number;
  name: string;
  email: string;
  password: string;
  constructor({ id, name, email, password }: User) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async fromToken(token: string) {
    const user = await verifyUserToken(token);
    return new UserEntity(user);
  }
}
