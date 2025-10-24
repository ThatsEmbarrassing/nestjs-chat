import { Injectable } from '@nestjs/common';

import { hash } from 'bcrypt';

import { PrismaService } from '@/prisma';

import { TokensService } from '../tokens';

import { UserAlreadyExistsException } from './exceptions';

@Injectable()
export class RegistrationService {
  constructor(
    private prisma: PrismaService,
    private tokensService: TokensService,
  ) {}

  private findUser(name: string) {
    return this.prisma.user.findFirst({
      where: { name },
    });
  }

  private async isUserExist(name: string) {
    const matched = await this.findUser(name);

    return !!matched;
  }

  /**
   * Throws {@link UserAlreadyExistsException} if user exists.
   * @param name - username
   */
  private async throwIfUserExists(name: string) {
    const isUserExist = await this.isUserExist(name);

    if (isUserExist) throw new UserAlreadyExistsException();
  }

  /**
   * Creates new user if he hasn't been created yet. Throws {@link UserAlreadyExistsException} if user exists.
   *
   * @param name
   * @param password
   * @returns
   */
  async signUp(name: string, password: string) {
    await this.throwIfUserExists(name);

    const passwordHash = await hash(password, 6);

    const { id, name: username } = await this.prisma.user.create({
      data: {
        name,
        passwordHash,
      },
      omit: {
        passwordHash: true,
        refreshToken: true,
      },
    });

    const tokens = await this.tokensService.getTokens({
      id,
      name: username,
    });

    await this.tokensService.updateRefreshToken(id, tokens.refreshToken);

    return tokens;
  }
}
