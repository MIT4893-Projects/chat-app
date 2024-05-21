import { z } from "zod";
import {
  ValidTokenRes,
  InvalidTokenRes,
  InvalidJsonRes,
  MissingFieldsRes,
} from "@/app/consts/responses";
import { verifyUserToken } from "@/auth/token/jwt/user";

const TokenRequest = z.object({
  token: z.string(),
});

export async function POST(request: Request) {
  return await request.json().then(
    async (data) => {
      try {
        const { token } = TokenRequest.parse(data);

        return await verifyUserToken(token).then(
          (user) => (user ? ValidTokenRes() : InvalidTokenRes()),
          () => InvalidTokenRes(),
        );
      } catch {
        return MissingFieldsRes();
      }
    },
    () => InvalidJsonRes(),
  );
}
