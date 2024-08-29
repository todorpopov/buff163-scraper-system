import { HttpException, HttpStatus } from "@nestjs/common";

export class UserCannotBeRegistered extends HttpException {
    constructor(reason: string) {
      super(reason, HttpStatus.NOT_ACCEPTABLE);
    }
  }