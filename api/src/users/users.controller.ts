import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(AuthGuard, AdminGuard)
    @Get('all/users')
    async getAllUsers() {
        try {
            const users = await this.usersService.getAllUsers()
            return users
        } catch(err) {
            return err
        }
    }

    @UseGuards(AuthGuard, AdminGuard)
    @Delete('delete/all/users')
    async deleteAllUsers() {
        try {
            await this.usersService.deleteAllUsers()
            return { msg: "All users have been deleted!" }
        } catch(err) {
            return err
        }
    }
}
