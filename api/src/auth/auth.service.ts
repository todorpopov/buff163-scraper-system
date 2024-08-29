import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Security } from 'src/users/security';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    public async signIn(email: string, password: string): Promise<string> {
        const user = await this.usersService.findOne(email)

        if(!Security.matches(password, user.getPassword())) {
            throw new UnauthorizedException('Incorrect password!')
        }

        const payload = { username: user.getUsername(), email: user.getEmail(), role: user.getRole() };
        return await this.jwtService.signAsync(payload)
    }

    public canRegister(body): boolean {
        if(!body.role) {
            return false
        }

        if(body.role === "user") {
            if(!body.username || !body.email || !body.password) {
                return false
            }

            return true
        } else if(body.role === "admin") {
            if(!body.global_admin_username || !body.global_admin_password || !body.global_admin_special_token) {
                return false
            }

            if(
                body.global_admin_username === process.env.API_GLOBAL_ADMIN_USERNAME &&
                body.global_admin_password === process.env.API_GLOBAL_ADMIN_PASSWORD &&
                body.global_admin_special_token === process.env.API_GLOBAL_ADMIN_SPECIAL_TOKEN
            ) {
                return true
            }
            
            return false
        } else {
            return false
        }
    }
}
