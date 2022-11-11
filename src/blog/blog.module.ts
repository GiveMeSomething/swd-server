import { Module } from '@nestjs/common';
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
  controllers: [],
})
export class BlogModule {}
