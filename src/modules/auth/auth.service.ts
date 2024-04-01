import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from '@/config/env';
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
    const { id: userId, login } = await this.userService.findOne(
      payload.userId,
    );

    return this.createTokensPair({ userId, login });
  }

  async createAccessToken(payload: TokenPayload) {
    return this.jwtService.signAsync(payload, {
      secret: config.jwt.secret_key,
      expiresIn: config.jwt.token_expire_time,
    });
  }

  async createRefreshToken(payload: TokenPayload) {
    return this.jwtService.signAsync(payload, {
      secret: config.jwt.secret_refresh_key,
      expiresIn: config.jwt.token_refresh_expire_time,
    });
  }

  async createTokensPair(payload: TokenPayload) {
    return {
      accessToken: await this.createAccessToken(payload),
      refreshToken: await this.createRefreshToken(payload),
    };
  }
}
