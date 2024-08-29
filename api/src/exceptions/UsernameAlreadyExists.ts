import { HttpException, HttpStatus } from "@nestjs/common";

export class UsernameAlreadyExists extends HttpException {
    constructor(username: string) {
      super(`Username (${username}) already exists!`, HttpStatus.NOT_ACCEPTABLE);
    }
  }