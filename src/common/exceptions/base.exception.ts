import { HttpException } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor({
    code,
    message,
    status,
  }: {
    code: number;
    message: string;
    status: number;
  }) {
    super({ code, message }, status);
  }
}
