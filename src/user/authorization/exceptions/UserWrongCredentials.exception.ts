import { ForbiddenException } from '@nestjs/common';

import type { HttpExceptionOptions } from '@nestjs/common';

/**
 * Use when username or password is wrong. Extends {@link NotFoundException}.
 */
export class UserWrongCredentialsException extends ForbiddenException {
  constructor(objectOrError?: any, options: HttpExceptionOptions = {}) {
    super(objectOrError, {
      ...options,
      cause: objectOrError,
      description: 'Username or password is wrong. Please, try again.',
    });
  }
}
