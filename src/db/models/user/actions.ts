import prisma from "@/db";

import bcrypt from "bcrypt";

import type { User } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { UserRegisterInput, UserLoginInput } from "@/db/models/user";
import { hashPassword } from "@/auth/password";

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
        user.password = await hashPassword(user.password);

        user = UserRegisterInput.parse(user);

        return await prismaAuth.user.create({ data: user });
      },

      async login(user: Prisma.UserWhereUniqueInput) {
        user.password = await hashPassword(user.password as string);

        user = UserLoginInput.parse(user);

        return await prisma.user.findUnique({ where: user });
      },

      async exists(user: Prisma.UserWhereUniqueInput) {
        return await prismaAuth.user.findUnique({ where: user });
      },
    },
  },
});

export const userModel = prismaAuth.user;
