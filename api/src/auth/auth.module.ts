import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.API_JWT_SECRET,
      signOptions: { expiresIn: "1h" }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
