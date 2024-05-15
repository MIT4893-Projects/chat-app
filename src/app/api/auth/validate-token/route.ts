import { JsonResponse, JsonErrorResponse } from "@/models/response";
import { HttpStatus } from "http-status-ts";
import { z } from "zod";
import { verifyUserToken } from "@/auth/token/jwt/user";
import userModel from "@/db/models/user";
import UserEntity from "@/db/models/user/entity";

const TokenRequest = z.object({
  token: z.string(),
});

export async function POST(request: Request) {
  return await request
    .json()
    .then(
      async (data) => {
        try {
          const { token } = TokenRequest.parse(data);

          return await verifyUserToken(token).then(
            async (userFromToken) => {
              const foundUser = await userModel.exists(
                new UserEntity(userFromToken),
              );

              return foundUser
                ? new JsonResponse({})
                : new JsonErrorResponse({
                    status_code: HttpStatus.UNAUTHORIZED,
                  });
            },
            () =>
              new JsonErrorResponse({ status_code: HttpStatus.UNAUTHORIZED }),
          );
        } catch (err) {
          return new JsonErrorResponse({ status_code: HttpStatus.BAD_REQUEST });
        }
      },
      () => new JsonErrorResponse({ status_code: HttpStatus.BAD_REQUEST }),
    )
    .catch(
      () =>
        new JsonErrorResponse({
          status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        }),
    );
}
