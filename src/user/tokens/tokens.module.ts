import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';

import { AccessTokenGuard, RefreshTokenGuard } from './guards';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  providers: [
    TokensService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AccessTokenGuard,
    RefreshTokenGuard,
  ],
  exports: [TokensService],
})
export class TokensModule {}
