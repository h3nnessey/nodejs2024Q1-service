import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from '@/config/env';
import { TokenPayload } from '../interfaces';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { refreshToken } = request.body;

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token in body');
    }

    try {
      const payload = await this.jwtService.verifyAsync<TokenPayload>(
        refreshToken,
        {
          secret: config.jwt.secret_refresh_key,
        },
      );

      request.body = { userId: payload.userId, login: payload.login };
    } catch {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }

    return true;
  }
}
