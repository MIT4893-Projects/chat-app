import userModel from "@/db/models/user";
import { JsonErrorResponse, JsonResponse } from "@/models/response";
import { HttpStatus } from "http-status-ts";

export async function POST(request: Request) {
  const user = await request.json();

  return await userModel
    .exists({ email: user.email })
    .then(async (userExists) =>
      userExists
        ? new JsonErrorResponse({
            status_code: HttpStatus.BAD_REQUEST,
            message: "User with this email already exists",
          })
        : await userModel.register(user).then(
            (result) => new JsonResponse({ payload: result }),
            (reason) =>
              new JsonErrorResponse({
                status_code: HttpStatus.INTERNAL_SERVER_ERROR,
                reason,
              }),
          ),
    );
}
