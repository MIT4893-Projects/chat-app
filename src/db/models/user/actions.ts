import prisma from "@/db";

import bcrypt from "bcrypt";

import { Prisma } from "@prisma/client";
import { UserRegisterInput, UserLoginInput } from "@/db/models/user";
import { hashPassword } from "@/auth/password";
import UserEntity from "./entity";

const prismaAuth = prisma.$extends({
  query: {
    user: {
      async create({ args, query }) {
        args.omit = { ...args.omit, password: true };
        return query(args);
      },

      async findUnique({ args, query }) {
        return query(args);
      },
    },
  },

  model: {
    user: {
      async register(user: Prisma.UserCreateInput) {
        user = UserRegisterInput.parse(user);
        user.password = await hashPassword(user.password);

        return await prismaAuth.user.create({ data: user });
      },

      async login(user: Prisma.UserWhereUniqueInput) {
        user = UserLoginInput.parse(user);
        user.password = await hashPassword(user.password as string);

        return await prisma.user.findUnique({ where: user });
      },

      async exists(user: Prisma.UserWhereUniqueInput) {
        return await prismaAuth.user.findUnique({ where: user });
      },

      async validateToken(token: string) {
        const userEntity = await UserEntity.fromToken(token);
        return await prismaAuth.user.exists(userEntity);
      },
    },
  },
});

export const userModel = prismaAuth.user;
