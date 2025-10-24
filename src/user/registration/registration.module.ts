import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

import { TokensModule } from '../tokens';

import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';

@Module({
  imports: [PrismaModule, TokensModule],
  providers: [RegistrationService],
  controllers: [RegistrationController],
})
export class RegistrationModule {}
