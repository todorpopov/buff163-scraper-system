import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Res,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
  
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const deactivateAuth = process.env.API_DEACTIVATE_AUTH
        if(deactivateAuth === "true"){return true}

        const request = context.switchToHttp().getRequest();
        const token = await this.extractTokenFromCookies(request);

        try {
            const payload = await this.jwtService.verifyAsync(token, {secret: process.env.API_JWT_SECRET})
            request['user'] = payload
        } catch {
            throw new UnauthorizedException("Incorrect credentials!");
        }

        return true;
    }

    private async extractTokenFromCookies(@Res() request: Request): Promise<string> {
        try {
            const token = request.cookies?.token
            return token;
        } catch {
            throw new UnauthorizedException('No credentials found!')
        }

    }
}