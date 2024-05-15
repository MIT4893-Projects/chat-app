import {
  InvalidJsonRes,
  MissingFieldsRes,
  RegisterUserExistsRes,
  RegisterUserSuccessRes,
} from "@/app/consts/responses";
import userModel from "@/db/models/user";

export async function POST(request: Request) {
  return await request.json().then(
    (user) =>
      userModel.exists({ email: user.email }).then(async (userExists) =>
        userExists
          ? RegisterUserExistsRes
          : await userModel.register(user).then(
              (user) => RegisterUserSuccessRes(user),
              () => MissingFieldsRes,
            ),
      ),
    () => InvalidJsonRes,
  );
}
