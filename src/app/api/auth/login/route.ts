import userModel from "@/db/models/user";
import { JsonErrorResponse, JsonResponse } from "@/models/response";
import { comparePassword } from "@/auth/password";
import { HttpStatus } from "http-status-ts";
import { getUserToken } from "@/auth/token/jwt/user";

export async function POST(request: Request) {
  const user = await request.json();

  return await userModel
    .exists({ email: user.email })
    .then(async (foundUser) => {
      const userMatch =
        foundUser && (await comparePassword(user.password, foundUser.password));

      if (!userMatch)
        return new JsonErrorResponse({
          status_code: HttpStatus.UNAUTHORIZED,
          error: "Invalid email or password",
        });

      const token = getUserToken(foundUser);
      return new JsonResponse({ payload: { token } });
    });
}
