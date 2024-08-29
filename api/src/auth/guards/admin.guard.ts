import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    NotFoundException,
    Res,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
  
@Injectable()
export class AdminGuard implements CanActivate {
    constructor() {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const deactivateAuth = process.env.API_DEACTIVATE_AUTH
        if(deactivateAuth === "true"){return true}

        const request = context.switchToHttp().getRequest()
        const token = await this.extractTokenFromCookies(request)
        const role = this.getUserRoleFromToken(token)

        if(role === "admin") {
            return true
        } else {
            throw new ForbiddenException('You have no permissions to access this resource!')
        }

    }

    private async extractTokenFromCookies(@Res() request: Request): Promise<string> {
        try {
            const token = request.cookies?.token
            return token
        } catch {
            throw new UnauthorizedException('No credentials found!')
        }

    }

    private getUserRoleFromToken(token: string) {
        const tokenArray = token.split('.')
        const payload = tokenArray[1]

        try {
            const decodedPayload = JSON.parse(atob(payload))
            console.log(decodedPayload)
            return decodedPayload?.role
        } catch {
            throw new NotFoundException('Could not find user permissions!')
        }
    }
}