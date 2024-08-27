import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './data/UserDTO';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post('create')
    async createUser(@Body() body) {
        const userDto = new UserDTO(body.username, body.email, body.password, body.role)
        try {
            await this.userService.createUser(userDto)
            return "User successfully created!"
        } catch(err) {
            console.log(err)
            return err
        }
    }

    @Get('all')
    async getAllUsers() {
        try {
            const users = await this.userService.getAllUsers()
            return users
        } catch(err) {
            console.log(err)
            return err
        }
    }
}
