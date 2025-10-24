import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import type { StringValue } from 'ms';

export class DatabaseConfig {
  @IsString()
  @IsNotEmpty()
  url: string;
}

export class JWTTokenConfig {
  @IsString()
  @IsNotEmpty()
  secret: string;

  @IsString()
  @IsNotEmpty()
  expires: StringValue;
}

export class JWTConfig {
  @Type(() => JWTTokenConfig)
  @ValidateNested()
  access: JWTTokenConfig;

  @Type(() => JWTTokenConfig)
  @ValidateNested()
  refresh: JWTTokenConfig;
}

export class RootConfig {
  @Type(() => DatabaseConfig)
  @ValidateNested()
  database: DatabaseConfig;

  @Type(() => JWTConfig)
  @ValidateNested()
  jwt: JWTConfig;
}
