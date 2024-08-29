import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidEmail extends HttpException {
    constructor(email: string) {
      super(`Invalid email (${email})!`, HttpStatus.NOT_ACCEPTABLE);
    }
  }