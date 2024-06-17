import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { UserDto, UserParamsDTO } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  // async create(userDto: UserDto): Promise<User> {
  //   try {
  //     const createdUser = await User.create(userDto);
  //     return createdUser;
  //   } catch (error) {
  //     throw new Error(`Failed to create user: ${error.message}`);
  //   }
  // }
  async findAll(params: UserParamsDTO): Promise<UserDto[]> {
    const {
      first_name,
      last_name,
      email,
      phone_no,
      isActive,
      limit,
      offset,
      gender,
      age,
      role,
    } = params;

    const queryOptions: any = {};

    if (first_name) queryOptions.first_name = first_name;
    if (last_name) queryOptions.last_name = last_name;
    if (email) queryOptions.email = email;
    if (phone_no) queryOptions.phone_no = phone_no;
    if (isActive !== undefined) queryOptions.isActive = isActive;
    if (gender) queryOptions.gender = gender;
    if (age) queryOptions.age = age;
    if (limit) queryOptions.limit = limit;
    if (offset) queryOptions.offset = offset;
    if (role) queryOptions.role = role;

    const users = await this.userRepository.getAllUsersByParams(
      queryOptions,
      limit,
      offset,
      params.sortBy,
      params.order,
    );
    return users;
  }

  async create(userDto: UserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(userDto.password, 10);
      const createdUser = await User.create({
        ...userDto,
        password: hashedPassword,
      });

      return createdUser;
    } catch (error) {
      console.log({ error });

      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<User> {
    // Find the user by ID in the database
    const user = await User.findByPk(id);

    // If user is not found, throw a NotFoundException
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  async findOneByEmail(email: string): Promise<User | null> {
    try {
      const user = await User.findOne<User>({
        where: { email },
      });
      return user;
    } catch (error) {
      throw new Error(`Failed to find user by email: ${error.message}`);
    }
  }

  async findOneById(id: number): Promise<User | null> {
    try {
      const user = await User.findOne<User>({ where: { id } });
      return user;
    } catch (error) {
      throw new Error(`Failed to find user by ID: ${error.message}`);
    }
  }
  //   async remove(@Param('id') id: string) {
  //     const deletedCount = await this.userService.delete(id);
  //     if (deletedCount === 0) {
  //       throw new NotFoundException(`User with ID ${id} not found.`);
  //     }
  //     // Return an appropriate response based on your application's requirements
  //     return { message: 'User deleted successfully' };
  //   }
  // }

  async update(id: string, updatedata: Partial<User>): Promise<User | null> {
    try {
      const [affectedCount, affectedRows] = await User.update(updatedata, {
        where: { id },
        returning: true,
      });
      if (affectedCount === 0) {
        throw new Error(`User with ID ${id} not found.`);
      }
      // Return the updated user
      return affectedRows[0];
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const deletedCount = await User.destroy({ where: { id } });
      // Check if any user was deleted
      if (deletedCount === 0) {
        throw new Error(`User with ID ${id} not found.`);
      }
      // Return a success message
      return `User with ID ${id} deleted successfully.`;
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }

  async updatepass(
    id: string,
    updatepass: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Find the user by ID
      const user = await this.findOneById(+id);

      if (!user) {
        return { success: false, message: `User with ID ${id} not found.` };
      }

      // Update the user's password
      user.password = updatepass;
      await user.save();

      // Return a success message
      return {
        success: true,
        message: `Password updated successfully for user with ID ${id}.`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to update password: ${error.message}`,
      };
    }
  }
}
