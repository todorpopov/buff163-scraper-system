import { HttpException, HttpStatus } from "@nestjs/common";

export class RoleNotValid extends HttpException {
    constructor(role: string) {
      super(`Role (${role}) not valid!`, HttpStatus.NOT_ACCEPTABLE);
    }
  }