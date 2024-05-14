import prisma from "@/db";

export const prismatoken = prisma.$extends({
  model: {
    token: {
      async new(userId: number) {},
    },
  },
});
