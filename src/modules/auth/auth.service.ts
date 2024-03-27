import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async signup() {
    return 'auth signup';
  }

  async login() {
    return 'auth login';
  }

  async refresh() {
    return 'auth refresh';
  }
}
