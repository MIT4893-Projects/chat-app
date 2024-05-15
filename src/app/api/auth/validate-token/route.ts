import { z } from "zod";
import userModel from "@/db/models/user";
import {
  ValidTokenRes,
  InvalidTokenRes,
  InvalidJsonRes,
  MissingFieldsRes,
} from "@/app/consts/responses";

const TokenRequest = z.object({
  token: z.string(),
});

export async function POST(request: Request) {
  return await request.json().then(
    async (data) => {
      try {
        const { token } = TokenRequest.parse(data);

        return await userModel.validateToken(token).then(
          (user) => (user ? ValidTokenRes : InvalidTokenRes),
          () => InvalidTokenRes,
        );
      } catch {
        return MissingFieldsRes;
      }
    },
    () => InvalidJsonRes,
  );
}
