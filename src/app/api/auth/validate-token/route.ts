import {
  JsonResponse,
  JsonErrorResponse,
  JsonBadRequestResponse,
} from "@/models/response";
import { HttpStatus } from "http-status-ts";
import { z } from "zod";
import userModel from "@/db/models/user";

const TokenRequest = z.object({
  token: z.string(),
});

export async function POST(request: Request) {
  return await request.json().then(
    async (data) => {
      try {
        const { token } = TokenRequest.parse(data);

        return await userModel.validateToken(token).then(
          (user) =>
            user
              ? new JsonResponse({})
              : new JsonErrorResponse({ status_code: HttpStatus.UNAUTHORIZED }),
          () => new JsonErrorResponse({ status_code: HttpStatus.UNAUTHORIZED }),
        );
      } catch (error) {
        return new JsonBadRequestResponse(error);
      }
    },
    (reason) => new JsonBadRequestResponse(reason),
  );
}
