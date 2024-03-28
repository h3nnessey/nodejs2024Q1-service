import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guards';
import { TokenPayload } from './interfaces';
import { Public } from './decorators';
import { AuthTokensResponse, SignUpResponse } from './dto';

@ApiTags('Authorization')
@Public()
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Sign Up',
    description: 'Sign Up',
  })
  @ApiOkResponse({ type: SignUpResponse, description: 'Successful sign up' })
  @ApiBadRequestResponse({
    description: 'Invalid data in body',
  })
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @ApiOperation({
    summary: 'Login',
    description: 'Login',
  })
  @ApiOkResponse({
    type: AuthTokensResponse,
    description: 'Successful login',
  })
  @ApiBadRequestResponse({
    description: 'Invalid data in body',
  })
  @ApiForbiddenResponse({
    description: 'Login failed',
  })
  @Post('login')
  async login(@Body() credentials: CreateUserDto) {
    return this.authService.login(credentials);
  }

  @ApiOperation({
    summary: 'Refresh token',
    description: 'Refresh token',
  })
  @ApiOkResponse({
    type: AuthTokensResponse,
    description: 'Successful token refresh',
  })
  @ApiUnauthorizedResponse({
    description: 'No refresh token in body',
  })
  @ApiForbiddenResponse({
    description: 'Expired or invalid refresh token',
  })
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refresh(@Body() payload: TokenPayload) {
    return this.authService.refresh(payload);
  }
}
