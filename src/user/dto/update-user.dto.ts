// update-user.dto.ts

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
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsEmail({}, { message: 'Invalid email format.' })
  @IsOptional()
  @IsNotEmpty({ message: 'Email must not be empty.' })
  email?: string;

  @IsString()
  @IsOptional()
  phone_no?: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty({ message: 'isActive must not be empty.' })
  isActive?: boolean;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Gender must not be empty.' })
  gender?: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty({ message: 'Age must not be empty.' })
  @Min(1, { message: 'Age must be at least 1.' })
  @Max(120, { message: 'Age must not exceed 120.' })
  age?: number;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Password must not be empty.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @IsStrongPassword() // Assuming you have a custom validator for strong password
  password?: string;

  @IsIn(['admin', 'user'], { message: 'Role must be either admin or user.' })
  @IsOptional()
  @IsNotEmpty({ message: 'Role must not be empty.' })
  role?: 'admin' | 'user';
}
