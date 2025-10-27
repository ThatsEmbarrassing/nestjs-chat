import { HttpAdapter, WsAdapter } from './adapters';

import type { ArgumentsHost, ContextType } from '@nestjs/common';

import type { IClientAdapter } from './adapters';

interface HostAdapterOptions<TContext extends string> {
  adapters?: Record<TContext, new (host: ArgumentsHost) => IClientAdapter>;
}

const defaultAdapters = {
  http: HttpAdapter,
  ws: WsAdapter,
} as Record<
  Exclude<ContextType, 'rpc'>,
  new (host: ArgumentsHost) => IClientAdapter
>;

export function hostAdapter(
  host: ArgumentsHost,
  options?: HostAdapterOptions<Exclude<ContextType, 'rpc'>>,
): IClientAdapter;
export function hostAdapter<TContext extends string>(
  host: ArgumentsHost,
  options: HostAdapterOptions<TContext>,
): IClientAdapter;
export function hostAdapter<
  TContext extends string = Exclude<ContextType, 'rpc'>,
>(
  host: ArgumentsHost,
  options: HostAdapterOptions<TContext> = {},
): IClientAdapter {
  const {
    adapters = defaultAdapters as Record<
      TContext,
      new (host: ArgumentsHost) => IClientAdapter
    >,
  } = options;

  const type = host.getType<TContext>();

  const adapter = adapters[type];

  return new adapter(host);
}
