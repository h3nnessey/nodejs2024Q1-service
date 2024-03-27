import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guards';
import { TokenPayload } from './interfaces';
import { Public } from './decorators';

@Public()
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: CreateUserDto) {
    return this.authService.login(credentials);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  async refresh(@Body() payload: TokenPayload) {
    return this.authService.refresh(payload);
  }
}
