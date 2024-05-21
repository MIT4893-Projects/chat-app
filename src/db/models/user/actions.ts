import prisma from "@/db";

import { Prisma } from "@prisma/client";
import { UserRegisterInput, UserLoginInput } from "@/db/models/user";
import { comparePassword, hashPassword } from "@/auth/password";

const prismaAuth = prisma.$extends({
  query: {
    user: {
      async create({ args, query }) {
        args.omit = { ...args.omit, password: true };
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

        const foundUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (foundUser)
          return comparePassword(user.password as string, foundUser.password);
        return false;
      },

      async exists(user: Prisma.UserWhereUniqueInput) {
        return await prismaAuth.user.findUnique({ where: user });
      },
    },
  },
});

export const userModel = prismaAuth.user;
