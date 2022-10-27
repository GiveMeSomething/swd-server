import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendAccountConfirmation(email: string, token: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: `Welcome ${email} !`,
      template: 'confirmation',
      context: {
        token,
      },
    });
  }
}
