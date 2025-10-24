import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { SignUpDTO } from './dto';

import { UserCreatedEvent } from './events';

import { RegistrationService } from './registration.service';

@Controller('user')
export class RegistrationController {
  constructor(private registrationService: RegistrationService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() dto: SignUpDTO) {
    const { name, password } = dto;

    const tokens = await this.registrationService.signUp(name, password);

    return new UserCreatedEvent(tokens.accessToken, tokens.refreshToken);
  }
}
