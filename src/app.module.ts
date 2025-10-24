import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypedConfigModule, fileLoader } from 'nest-typed-config';

import { RootConfig } from './config';

import { UserModule } from './user';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypedConfigModule.forRoot({
      schema: RootConfig,
      load: fileLoader(),
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
