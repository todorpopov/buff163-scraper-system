import { HttpException, HttpStatus } from "@nestjs/common";

export class AlreadyLoggedIn extends HttpException {
    constructor() {
      super('You are already logged in!', HttpStatus.NOT_ACCEPTABLE);
    }
  }