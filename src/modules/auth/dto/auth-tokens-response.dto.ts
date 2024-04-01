import { ApiProperty } from '@nestjs/swagger';

export class AuthTokensResponse {
  @ApiProperty({
    type: 'string',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNjcwYTZmZC02MzQ0LTRmMjMtYjBlNC1iODYwYWNkMTVmYTYiLCJsb2dpbiI6ImNhdF9sb3ZlciIsImlhdCI6MTcxMTU4NDcyNSwiZXhwIjoxNzExNTg4MzI1fQ.tFBLtIp7121B5GJzA2Ds3RgXZdjs_jKXr_ThqGhL2xM',
    description: 'Access token',
  })
  accessToken: string;

  @ApiProperty({
    type: 'string',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNjcwYTZmZC02MzQ0LTRmMjMtYjBlNC1iODYwYWNkMTVmYTYiLCJsb2dpbiI6ImNhdF9sb3ZlciIsImlhdCI6MTcxMTU4NDcyNSwiZXhwIjoxNzExNjcxMTI1fQ.ueOhruuOfNb5SU6VA0BBbEP1tJ2u6v7GV5tnlA1V_Ew',
    description: 'Refresh token',
  })
  refreshToken: string;
}
