import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config';

@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot(config.MONGO_URL)],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
