import type { ArgumentsHost } from '@nestjs/common';

import type { Socket } from 'socket.io';

import type { IClientAdapter } from './types';

export class WsAdapter implements IClientAdapter {
  constructor(private host: ArgumentsHost) {}

  send(err: unknown): void {
    const ctx = this.host.switchToWs();
    const client = ctx.getClient<Socket>();

    const baseData = {
      status: 'error',
      timestamp: new Date().toISOString(),
    };

    if (err instanceof Error) {
      client.emit('exception', {
        ...baseData,
        message: err.message,
      });

      return;
    }

    client.emit('exception', {
      ...baseData,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Bad request: ${err}`,
    });
  }
}
