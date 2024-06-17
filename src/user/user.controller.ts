import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  // UseGuards,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './user.service';
import { UserDto, UserParamsDTO } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/UpdateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  create(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @Get()
  async findAll(@Query() params: UserParamsDTO) {
    return await this.userService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateAuthDto) {
    return await this.userService.update(id, updateUserDto);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
