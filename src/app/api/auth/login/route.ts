import userModel from "@/db/models/user";
import { comparePassword } from "@/auth/password";
import { getUserToken } from "@/auth/token/jwt/user";
import {
  InvalidJsonRes,
  LoginFailedRes,
  LoginSuccessRes,
} from "@/app/consts/responses";

export async function POST(request: Request) {
  return await request.json().then(
    (user) =>
      userModel.exists({ email: user.email }).then(async (foundUser) => {
        const userMatch =
          foundUser &&
          (await comparePassword(user.password, foundUser.password));

        if (!userMatch) return LoginFailedRes();

        const token = getUserToken(foundUser);
        return LoginSuccessRes({ token });
      }),
    () => InvalidJsonRes(),
  );
}
