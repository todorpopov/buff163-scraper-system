import { Body, Controller, Post, Res, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserDTO } from '../users/data/UserDTO';
import { AuthService } from './auth.service';
import { Response , Request} from 'express'
import { UserCannotBeRegistered } from 'src/exceptions/UserCannotBeRegistered';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {}

    @Post('register')
    async createUser(@Body() body) {
        if(!this.authService.canRegister(body)) {
            throw new UserCannotBeRegistered('User cannot be registered!')
        }

        const userDto = new UserDTO(body.username, body.email, body.password, body.role)
        try {
            await this.usersService.createUser(userDto)
            return "User successfully created!"
        } catch(error) {
            return error
        }
    }

    @Post('login')
    async login(@Body() body, @Res({ passthrough: true }) response: Response) {
        try {
            const token = await this.authService.signIn(body.email, body.password)
            response.cookie('token', token, { 
                sameSite: "none",
                secure: true, 
            }).status(200)
        } catch(error) {
            return error
        }
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response){
        response.clearCookie('token', { 
            sameSite: "none",
            secure: true, 
        }).status(200)
    }
}