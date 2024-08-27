import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './data/User';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: userSchema }])
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
