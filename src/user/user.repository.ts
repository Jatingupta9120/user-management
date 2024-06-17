import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor() {}

  async getAllUsers(): Promise<UserDto[]> {
    const users = await User.findAll();
    return users.map((user) => this.userToDto(user));
  }

  async getAllUsersByParams(
    queryOptions?: any,
    limit?: number,
    offset?: number,
    sortBy: string = 'id',
    order: string = 'ASC',
  ): Promise<UserDto[]> {
    const users = await User.findAll({
      where: queryOptions,
      limit: limit,
      offset: offset,
      order: [[sortBy, order]],
    });

    return users.map((user) => this.userToDto(user));
  }

  async getUserById(id: number): Promise<UserDto | null> {
    const user = await User.findByPk(id);
    return user ? this.userToDto(user) : null;
  }

  async getUserByEmail(email: string): Promise<UserDto | null> {
    const user = await User.findOne({ where: { email } });
    return user ? this.userToDto(user) : null;
  }

  async addIntoDB(user: UserDto): Promise<UserDto> {
    const newUser = await User.create(user);
    return this.userToDto(newUser);
  }

  async saveUser(user: UserDto): Promise<UserDto> {
    const updatedUser = await User.findByPk(user.id);
    if (!updatedUser) {
      throw new Error(`User with id ${user.id} not found.`);
    }

    updatedUser.first_name = user.first_name;
    updatedUser.last_name = user.lastName;
    updatedUser.email = user.email;
    updatedUser.phone_no = user.phone_no;
    updatedUser.password = user.password;
    updatedUser.isActive = user.isActive;
    updatedUser.role = user.role;
    updatedUser.gender = user.gender;

    await updatedUser.save();
    return this.userToDto(updatedUser);
  }

  private userToDto(user: User): UserDto {
    return {
      id: user.id,
      first_name: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone_no: user.phone_no,
      password: user.password,
      isActive: user.isActive,
      role: user.role,
      gender: user.gender,
      age: user.age,
      address: user.address,
      occupation: user.occupation,
    };
  }
}
