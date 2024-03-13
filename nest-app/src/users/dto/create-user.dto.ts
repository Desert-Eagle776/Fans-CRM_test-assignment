import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

const MIN_LENGTH = 1;
const MAX_LENGTH = 100;

export class CreateUserDto {
  @IsString({ message: 'The name field must be a string.' })
  @MinLength(MIN_LENGTH)
  @MaxLength(MAX_LENGTH)
  readonly name: string;

  @IsString({ message: 'The email field must be a string.' })
  @IsEmail({}, { message: 'The email field must match the email format.' })
  @MinLength(MIN_LENGTH)
  @MaxLength(MAX_LENGTH)
  readonly email: string;


  @MinLength(MIN_LENGTH)
  @MaxLength(MAX_LENGTH)
  readonly password: string;
}
