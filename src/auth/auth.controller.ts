import { Controller, HttpCode, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, SecuredUser } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(200)
  public async register(
    @Body() userCredentials: RegisterDto,
  ): Promise<SecuredUser> {
    return this.authService.register(userCredentials);
  }
}
