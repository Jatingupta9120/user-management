import { IsNotEmpty } from 'class-validator';

export class ResetDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  newPass: string;
}
