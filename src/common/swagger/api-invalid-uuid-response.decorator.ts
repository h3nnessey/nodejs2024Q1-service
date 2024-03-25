import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';

export const ApiInvalidUuidResponse = () => {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'id is invalid (not UUID)',
    }),
  );
};
