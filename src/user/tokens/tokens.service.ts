import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { hash } from 'bcrypt';

import { PrismaService } from '@/prisma';

import { JWTConfig } from '@/config';

@Injectable()
export class TokensService {
  constructor(
    private jwtService: JwtService,
    private jwtConfig: JWTConfig,
    private prisma: PrismaService,
  ) {}

  private getAccessToken(payload: object) {
    return this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.access.secret,
      expiresIn: this.jwtConfig.access.expires,
    });
  }

  private getRefreshToken(payload: object) {
    return this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refresh.secret,
      expiresIn: this.jwtConfig.refresh.expires,
    });
  }

  async getTokens(payload: object) {
    const [accessToken, refreshToken] = await Promise.all([
      this.getAccessToken(payload),
      this.getRefreshToken(payload),
    ]);

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken, 6);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });
  }

  async clearRefreshToken(userId: number) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: null,
      },
    });
  }
}
