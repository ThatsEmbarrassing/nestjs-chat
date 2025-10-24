import { Injectable } from '@nestjs/common';

import { compare } from 'bcrypt';

import { PrismaService } from '@/prisma';

import { TokensService } from '../tokens';

import { UserWrongCredentialsException } from './exceptions';

@Injectable()
export class AuthorizationService {
  constructor(
    private prisma: PrismaService,
    private tokensService: TokensService,
  ) {}

  private findUser(name: string) {
    return this.prisma.user.findFirst({
      where: { name },
    });
  }

  async signIn(name: string, password: string) {
    const user = await this.findUser(name);
    if (!user) throw new UserWrongCredentialsException();

    const passwordMatches = await compare(password, user.passwordHash);
    if (!passwordMatches) throw new UserWrongCredentialsException();

    const tokens = await this.tokensService.getTokens({
      sub: user.id,
      name: user.name,
    });

    await this.tokensService.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }
}
