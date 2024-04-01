import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const ApiBearerControl = () => {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiUnauthorizedResponse({
      description: 'Access token is missing or invalid',
    }),
  );
};
