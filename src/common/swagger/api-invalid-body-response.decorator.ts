import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';

export const ApiInvalidBodyResponse = () => {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'body does not contain required fields',
    }),
  );
};
