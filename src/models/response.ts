import { httpStatusTextByCode, HttpStatus } from "http-status-ts";

export interface IJsonResponse {
  status_code?: number;
  message?: string;
  error?: string;
  payload?: any;
}

export class JsonResponse extends Response implements IJsonResponse {
  status_code?: number;
  message?: string;
  error?: string;
  payload?: any;

  constructor({
    status_code = HttpStatus.OK,
    message,
    error,
    payload,
  }: IJsonResponse) {
    super(JSON.stringify({ status_code, message, error, payload }));
  }
}

interface IJsonErrorResponse extends IJsonResponse {
  status_code: number;
  message?: string;
  reason?: any;
}

export class JsonErrorResponse extends JsonResponse {
  constructor({ status_code, message, reason }: IJsonErrorResponse) {
    super({
      status_code: status_code,
      error: httpStatusTextByCode(status_code),
      message,
      payload: reason ? { reason: reason } : undefined,
    });
  }
}

export class JsonBadRequestResponse extends JsonErrorResponse {
  constructor(error?: any) {
    super({ status_code: HttpStatus.BAD_REQUEST, payload: error });
  }
}
