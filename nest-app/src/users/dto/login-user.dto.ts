import { IsString, MinLength } from "class-validator";

const MIN_LENGTH = 1;

export class LoginUserDto {
  @IsString({ message: 'The name field must be a string.' })
  @MinLength(MIN_LENGTH)
  readonly name: string;

  @IsString({ message: 'The password field must be a string.' })
  @MinLength(MIN_LENGTH)
  readonly password: string;
}
