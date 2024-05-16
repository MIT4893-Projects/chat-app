import userModel from "@/db/models/user";
import { getUserToken } from "@/auth/token/jwt/user";
import {
  InvalidJsonRes,
  LoginFailedRes,
  LoginSuccessRes,
  MissingFieldsRes,
} from "@/app/consts/responses";

export async function POST(request: Request) {
  return await request.json().then(
    async (user) =>
      userModel.login(user).then(
        async (success) =>
          success
            ? LoginSuccessRes({ token: getUserToken(user) })
            : LoginFailedRes(),
        () => MissingFieldsRes(),
      ),
    () => InvalidJsonRes(),
  );
}
