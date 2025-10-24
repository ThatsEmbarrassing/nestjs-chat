import { Module } from '@nestjs/common';

import { AuthorizationModule } from './authorization';
import { RegistrationModule } from './registration';

@Module({
  imports: [RegistrationModule, AuthorizationModule],
})
export class UserModule {}
