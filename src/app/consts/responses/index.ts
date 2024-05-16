import { JsonSucessResponse, JsonErrorResponse } from "@/models/response";
import { HttpStatus } from "http-status-ts";

export const ValidTokenRes = () =>
  new JsonSucessResponse({
    message: "Valid token",
  });

export const InvalidTokenRes = () =>
  new JsonErrorResponse({
    status_code: HttpStatus.UNAUTHORIZED,
    message: "Invalid token",
  });

export const MissingFieldsRes = () =>
  new JsonErrorResponse({
    status_code: HttpStatus.BAD_REQUEST,
    message: "Required fields not found",
  });

export const InvalidJsonRes = () =>
  new JsonErrorResponse({
    status_code: HttpStatus.BAD_REQUEST,
    message: "Invalid JSON",
  });

export const LoginFailedRes = () =>
  new JsonErrorResponse({
    status_code: HttpStatus.BAD_REQUEST,
    message: "Invalid email or password",
  });

export const LoginSuccessRes = (payload: any) =>
  new JsonSucessResponse({
    message: "Login success",
    payload,
  });

export const RegisterUserExistsRes = () =>
  new JsonErrorResponse({
    status_code: HttpStatus.BAD_REQUEST,
    message: "User with this email already exists",
  });

export const RegisterUserSuccessRes = (payload: any) =>
  new JsonSucessResponse({
    message: "Registered user",
    payload,
  });
