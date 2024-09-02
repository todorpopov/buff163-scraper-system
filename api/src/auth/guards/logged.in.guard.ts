import {
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { AlreadyLoggedIn } from 'src/exceptions/AlreadyLoggedIn';
  
@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor() {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const deactivateAuth = process.env.API_DEACTIVATE_AUTH
        if(deactivateAuth === "true"){return true}

        const request = context.switchToHttp().getRequest();
        const token = request.cookies?.token
        if(!token) {
            return true
        } else {
            throw new AlreadyLoggedIn()
        }
    }
}