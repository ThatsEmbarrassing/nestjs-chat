import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
