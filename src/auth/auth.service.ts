import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { MailService } from '../mail/mail.service';
import {
  UserExistedException,
  UserUnknownException,
} from 'src/common/exceptions/user.exception';
import { SecuredUser } from './types';
import { RegisterDto } from './types/auth.dto';
import { getUnixTs } from 'src/utils/time';
import { MailSendFailedException } from 'src/common/exceptions/mail.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly mailService: MailService,
  ) {}
  public async register(userCredentials: RegisterDto): Promise<SecuredUser> {
    const { email, password } = userCredentials;

    // Check first if the user already exists
    const foundUser = await this.prisma.user.findUnique({ where: { email } });
    if (foundUser) {
      throw new UserExistedException(
        'This email had been registered. Please try logging in.',
      );
    }

    // If the user does not exist, create a new user
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password,
      },
    });

    if (!newUser) {
      throw new UserUnknownException('Something went wrong. Please try again.');
    }

    // Generate a confirmation token for the user and send it as an email to user
    const confirmationToken = this.jwt.sign({ email });
    try {
      await this.mailService.sendAccountConfirmation(email, confirmationToken);
    } catch {
      throw new MailSendFailedException(
        'User created but failed to send confirmation email. Please try again.',
      );
    }

    // Log email to prevent spamming
    await this.prisma.emailLog.upsert({
      where: {
        email,
      },
      update: {
        timestamp: getUnixTs(),
      },
      create: {
        email,
        timestamp: getUnixTs(),
      },
    });

    // Make secured user object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...securedUser } = newUser;
    return securedUser;
  }
}
