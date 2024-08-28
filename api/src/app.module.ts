import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

const mongo_db_port = process.env.MONGO_DB_PORT

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://mongo:${mongo_db_port}/api`, {
      serverSelectionTimeoutMS: 5000,
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
