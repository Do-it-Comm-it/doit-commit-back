import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { FirebaseAppService } from './auth.service';

@Module({
  imports: [UsersModule],
  providers: [FirebaseAppService],
  controllers: [AuthController],
  exports: [FirebaseAppService],
})
export class AuthModule {}
