import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.EMAIL_CONFIRMATION_TOKEN_SECRET,
      signOptions: {
        expiresIn: process.env.EMAIL_CONFIRMATION_TOKEN_EXPIRATION_TIME,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
