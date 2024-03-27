import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto';
import { TokenPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { id, login } = await this.userService.create(createUserDto);

    const tokens = await this.createTokensPair({
      userId: id,
      login,
    });

    return {
      id,
      login,
      ...tokens,
    };
  }

  async login(credentials: CreateUserDto) {
    const { id, login } = await this.userService.findByCredentials(credentials);

    return this.createTokensPair({
      userId: id,
      login,
    });
  }

  async refresh(payload: TokenPayload) {
    return this.createTokensPair(payload);
  }

  async createAccessToken(payload: TokenPayload) {
    return this.jwtService.signAsync(payload, {
      secret: 'JWT_SECRET_KEY',
      expiresIn: '1h',
    });
  }

  async createRefreshToken(payload: TokenPayload) {
    return this.jwtService.signAsync(payload, {
      secret: 'JWT_SECRET_REFRESH_KEY',
      expiresIn: '24h',
    });
  }

  async createTokensPair(payload: TokenPayload) {
    return {
      accessToken: await this.createAccessToken(payload),
      refreshToken: await this.createRefreshToken(payload),
    };
  }
}
