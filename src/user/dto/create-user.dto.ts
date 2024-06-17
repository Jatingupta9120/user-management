import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  // IsBoolean,
  IsString,
  IsNumber,
  // Min,
  // Max,
  MinLength,
  // IsIn,
  // Validate,/
  // MaxLength,
  // Matches,
  // IsInt,
} from 'class-validator';

// import { CustomEmailValidation } from './isemailValidation.dto';

export class UserParamsDTO {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsEmail()
  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phone_no: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsNotEmpty()
  @IsOptional()
  isActive: boolean;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  occupation: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  role: string;

  @IsOptional()
  limit: number;

  @IsOptional()
  offset: number;

  @IsString()
  @IsOptional()
  sortBy: string;

  @IsString()
  @IsOptional()
  order: string;
}

export class UserDto {
  id: string;

  @IsNotEmpty()
  @IsString()
  readonly first_name: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  @IsString()
  readonly email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  readonly phone_no: string;

  @IsString()
  readonly gender: string;

  @IsNotEmpty()
  // @IsBoolean()
  readonly isActive: boolean;

  @IsNumber()
  readonly age: number;

  @IsString()
  readonly address: string;

  @IsString()
  readonly occupation: string;

  @IsNotEmpty()
  @IsString()
  readonly role: string;
}
