import { Controller, Body, Post } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/dto/create-user.dto';
import { LoginDTO } from './dto/Logindto';
// import { ResetDto } from './dto/ResetDto';
// import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: LoginDTO) {
    return await this.authService.login(user);
  }

  // @UseGuards(DoesUserExist)
  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }

  // @Put('Change-password')
  // async reset(@Body() user: ResetDto){
  //   return await this.authService.reset(user);
  // }
}
