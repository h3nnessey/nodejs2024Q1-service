import { AuthService } from './auth.service';
import { Controller, Post } from '@nestjs/common';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup() {
    return this.authService.signup();
  }

  @Post('login')
  async login() {
    return this.authService.login();
  }

  @Post('refresh')
  async refresh() {
    return this.authService.refresh();
  }
}
