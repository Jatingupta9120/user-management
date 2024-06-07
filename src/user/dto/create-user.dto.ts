import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
  IsNumber,
  Min,
  Max,
  MinLength,
  IsIn,
  Validate,
  MaxLength,
  Matches,
} from 'class-validator';

import { CustomEmailValidation } from './isemailValidation.dto';
export class UserDto {
  @IsOptional()
  @IsNotEmpty()
  id?: string;

  @IsString()
  @IsNotEmpty()
  first_name: string; //client requirement 1 required

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty({ message: 'Email must not be empty.' })
  @Validate(CustomEmailValidation)
  email: string;

  @IsString()
  @IsOptional()
  phone_no: string;

  @IsBoolean()
  @IsNotEmpty({ message: 'isActive must not be empty.' })
  isActive: boolean;

  @IsString()
  @IsIn(['Male', 'Female'], { message: 'Role must be either admin or user.' })
  gender: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Age must not be empty.' })
  @Min(1, { message: 'Age must be at least 1.' })
  @Max(120, { message: 'Age must not exceed 120.' })
  age: number;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsNotEmpty({ message: 'Password must not be empty.' })
  @MinLength(4, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsIn(['admin', 'user'], { message: 'Role must be either admin or user.' })
  @IsNotEmpty({ message: 'Role must not be empty.' })
  role: 'admin' | 'user';
}
