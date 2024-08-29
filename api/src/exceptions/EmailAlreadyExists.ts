import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailAlreadyExists extends HttpException {
    constructor(email: string) {
      super(`Email (${email}) already exists!`, HttpStatus.NOT_ACCEPTABLE);
    }
  }