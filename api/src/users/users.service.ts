import { Injectable } from '@nestjs/common';
import { UserDTO } from './data/UserDTO';
import { EmailNotValid } from 'src/errors/EmailNotValid';
import { DataConversion } from './data/DataConversion';
import { IUser } from './data/User';
import { UserUtils } from './users.utils';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel("User") private readonly userModel: Model<IUser>){}
    
    public async createUser(userDto: UserDTO): Promise<void> {
        if(!UserUtils.isEmailValid(userDto.getEmail())) {
            throw EmailNotValid(`"${userDto.getEmail()}" is not valid!`)
        }

        const user = new this.userModel(userDto.getJson())
        await user.save()
    }

    public async getAllUsers(): Promise<Array<UserDTO>> {
        const users = await this.userModel.find({})
        const userDtos = users.map(user => {
            return DataConversion.toDto(user)
        })

        return userDtos
    }
}