import { ApiProperty, OmitType } from '@nestjs/swagger';
import { AuthTokensResponse } from './auth-tokens-response.dto';

export class SignUpResponse extends OmitType(AuthTokensResponse, [] as const) {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: 'f0f9b1b7-8b2b-4b6b-8b1b-8b2b8b1b7b2b',
    description: 'User ID',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'cat_lover',
    description: 'User login',
  })
  login: string;
}
