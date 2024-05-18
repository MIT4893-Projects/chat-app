import { HttpStatus } from "http-status-ts";

export interface IJsonResponse {
  status_code?: number;
  message?: string;
  payload?: any;
  reason?: any;
}

export class JsonResponse extends Response implements IJsonResponse {
  status_code?: number;
  message?: string;
  payload?: any;

  constructor({
    status_code = HttpStatus.OK,
    message,
    payload,
  }: IJsonResponse = {}) {
    super(JSON.stringify({ status_code, message, payload }), {
      status: status_code,
    });
  }
}

export class JsonErrorResponse extends JsonResponse {
  constructor({ status_code, message, reason }: IJsonResponse = {}) {
    super({
      status_code,
      message,
      reason,
    });
  }
}

export class JsonSucessResponse extends JsonResponse {
  constructor({ status_code, message, payload }: IJsonResponse = {}) {
    super({ status_code, message, payload });
  }
}
