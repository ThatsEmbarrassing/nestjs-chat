import { HttpException } from '@nestjs/common';

import type { ArgumentsHost } from '@nestjs/common';

import type { Request as ExRequest, Response as ExResponse } from 'express';

import type { IClientAdapter } from './types';

export class HttpAdapter implements IClientAdapter {
  constructor(private host: ArgumentsHost) {}

  send(err: unknown): void {
    const ctx = this.host.switchToHttp();
    const req = ctx.getRequest<ExRequest>();
    const res = ctx.getResponse<ExResponse>();

    const baseData = {
      timestamp: new Date().toISOString(),
      path: req.url,
    };

    if (err instanceof HttpException) {
      const status = err.getStatus();

      res.status(status).send({
        ...baseData,
        status,
        message: err.message,
      });

      return;
    }

    if (err instanceof Error) {
      res.status(400).send({
        ...baseData,
        status: 400,
        message: `Bad request: ${err.message}`,
      });

      return;
    }

    throw err;
  }
}
