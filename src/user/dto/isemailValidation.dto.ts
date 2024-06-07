import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entities/user.entity';

@Injectable()
export class CustomEmailValidation {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async validate(value: string): Promise<boolean> {
    const user = await this.userModel.findOne({ where: { email: value } });
    if (user) {
      throw new UnprocessableEntityException('Email already exists');
    }
    return true;
  }
}
