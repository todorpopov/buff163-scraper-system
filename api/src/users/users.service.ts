import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDTO } from './data/UserDTO';
import { DataConversion } from './data/DataConversion';
import { IUser } from './data/User';
import { UserUtils } from './users.utils';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Security } from './security';
import { InvalidEmail } from 'src/exceptions/InvalidEmail';
import { UsernameAlreadyExists } from 'src/exceptions/UsernameAlreadyExists';
import { EmailAlreadyExists } from 'src/exceptions/EmailAlreadyExists';

@Injectable()
export class UsersService {
    constructor(@InjectModel("User") private readonly userModel: Model<IUser>){}
    
    public async createUser(userDto: UserDTO): Promise<void> {
        if(!UserUtils.isEmailValid(userDto.getEmail())) {
            throw new InvalidEmail(userDto.getEmail())
        }

        if(await this.userModel.exists({ username: userDto.getUsername() }) !== null) {
            throw new UsernameAlreadyExists(userDto.getUsername())
        }

        if(await this.userModel.exists({ email: userDto.getEmail() }) !== null) {
            throw new EmailAlreadyExists(userDto.getEmail())
        }

        userDto.setPassword(Security.hashPassword(userDto.getPassword()))

        const user = new this.userModel(userDto.getJson())
        await user.save().catch(error => console.log(error))
    }

    public async getAllUsers(): Promise<Array<UserDTO>> {
        const users = await this.userModel.find({})
        const userDtos = users.map(user => {
            return DataConversion.toDto(user)
        })

        return userDtos
    }

    public async deleteAllUsers(): Promise<void> {
        await this.userModel.deleteMany({})
    }

    public async findOne(email: string): Promise<UserDTO> {
        const user = await this.userModel.findOne({ email: email }) 

        if(user === null) {
            throw new NotFoundException('User not found!', `No user with email (${email}) found!`)
        }

        const userDto = DataConversion.toDto(user)
        return userDto
    }
}