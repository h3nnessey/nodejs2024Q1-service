import { PickType } from '@nestjs/swagger';
import { AuthTokensResponse } from './auth-tokens-response.dto';

export class RefreshTokenDto extends PickType(AuthTokensResponse, [
  'refreshToken',
] as const) {}
