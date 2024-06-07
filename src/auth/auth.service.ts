import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UsersService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    try {
      const user = await this.userService.findOneByEmail(username);
      if (!user) {
        return null;
      }

      const isPasswordValid = await this.comparePassword(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        return null;
      }
      return user;
    } catch (error) {
      throw new Error(`Failed to validate user: ${error.message}`);
    }
  }

  public async login(
    user: Partial<User>,
  ): Promise<{ user: Partial<User>; token: string }> {
    try {
      const user2 = await User.findOne({ where: { email: user.email } });

      const token = await this.generateToken(user2);
      return { user, token };
    } catch (error) {
      throw new Error(`Failed to login user: ${error.message}`);
    }
  }
//    async changepassword(
//     user: Partial<User>,
//   ): Promise<{ user: Partial<User>}> {
//     try {
//       const user2 = await User.findOne({ where: { email: user.email } });
//       if(!user2){
//             throw new NotFoundException('Requested User is not found');
        
//         }
//         const isvalid=await bcrypt.compare(
//             user.password,
//             currpassword
//         )

//         if(!isvalid){
//             throw new UnauthorizedException('Invalid password'),
//         }
//         const hashedPassword=await bcrypt.hash(newpass,8);
//         return await this.userService.updatepass(id,hashedPassword);
        
      
//     } catch (error) {
//       throw new Error(`Failed to reset pass: ${error.message}`);
//     }
//   }

  public async create(
    user: Partial<User>,
  ): Promise<{ user: Partial<User>; token: string }> {
    try {
      const hashedPassword = await this.hashPassword(user.password);
      const newUser = await User.create({
        ...user,
        password: hashedPassword,
      });
      const token = await this.generateToken(newUser);
      return { user: newUser, token };
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  private async generateToken(user: Partial<User>): Promise<string> {
    try {
      console.log(process.env.JWTKEY, user);

      const token = await this.jwtService.signAsync(
        { username: user.email },
        { secret: 'secret', expiresIn: 87656789 },
      );
      return token;
    } catch (error) {
      throw new Error(`Failed to generate token: ${error.message}`);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    } catch (error) {
      throw new Error(`Failed to hash password: ${error.message}`);
    }
  }

  private async comparePassword(
    enteredPassword: string,
    dbPassword: string,
  ): Promise<boolean> {
    try {
      const match = await bcrypt.compare(enteredPassword, dbPassword);
      return match;
    } catch (error) {
      throw new Error(`Failed to compare passwords: ${error.message}`);
    }
  }

}
  
