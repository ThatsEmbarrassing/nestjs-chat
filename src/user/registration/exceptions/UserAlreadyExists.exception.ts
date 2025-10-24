import { ConflictException } from '@nestjs/common';

import type { HttpExceptionOptions } from '@nestjs/common';

/**
 * Use when user already exists. Extends {@link ConflictException}.
 */
export class UserAlreadyExistsException extends ConflictException {
  constructor(objectOrError?: any, options: HttpExceptionOptions = {}) {
    super(objectOrError, {
      ...options,
      cause: objectOrError,
      description: 'User already exists',
    });
  }
}
