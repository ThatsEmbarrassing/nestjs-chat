import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { SignInDTO } from './dto';

import { AuthorizationService } from './authorization.service';

@Controller('user')
export class AuthorizationController {
  constructor(private authorizationService: AuthorizationService) {}

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() dto: SignInDTO) {
    const { name, password } = dto;

    return await this.authorizationService.signIn(name, password);
  }
}
