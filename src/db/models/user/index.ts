import { z } from "zod";
import { userModel } from "./actions";

export const UserRegisterInput = z.object({
  name: z.string().max(50).regex(/\w+/),
  email: z.string().email(),
  password: z.string().min(8),
});

export default userModel;
