import { Catch } from '@nestjs/common';

import { hostAdapter } from './hostAdapter';

import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter<Error> {
  catch(exception: Error, host: ArgumentsHost) {
    const adapter = hostAdapter(host);

    adapter.send(exception);
  }
}
