import { Global, Module } from '@nestjs/common';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';

const transportOptions: TransportType = {
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT,
  secure: process.env.SMTP_IS_SECURE.toLowerCase() === 'true',
  auth: {
    user: process.env.SMTP_AUTH_USERNAME,
    pass: process.env.SMTP_AUTH_PASSWORD,
  },
};

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: transportOptions,
      defaults: {
        from: process.env.SMTP_DEFAULT_SENDER,
      },
      template: {
        dir: join(process.cwd(), process.env.SMTP_TEMPLATES_DIR),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
