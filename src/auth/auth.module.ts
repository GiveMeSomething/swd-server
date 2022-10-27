import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.EMAIL_CONFIRMATION_TOKEN_SECRET,
      signOptions: {
        expiresIn: process.env.EMAIL_CONFIRMATION_TOKEN_EXPIRATION_TIME,
      },
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
