import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(AuthGuard)
    @Get('all/users')
    async getAllUsers() {
        try {
            const users = await this.usersService.getAllUsers()
            return users
        } catch(err) {
            return err
        }
    }

    @UseGuards(AuthGuard)
    @Delete('delete/all/users')
    async deleteAllUsers() {
        try {
            await this.usersService.deleteAllUsers()
        } catch(err) {
            return err
        }
    }
}
