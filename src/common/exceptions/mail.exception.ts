import { BaseException } from './base.exception';

export class MailSendFailedException extends BaseException {
  constructor(message = 'Failed to send email') {
    super({ code: 2000, message, status: 500 });
  }
}
