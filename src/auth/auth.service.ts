import { Injectable } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePasswordHelper } from '@/helpers/utills';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto, CreateAuthGoogleDto } from './dto/create-auth.dto';
import {
  ChangePasswordDto,
  CodeAuthDto,
} from '@/modules/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (!user) {
      return null;
    }
    const isValidPassword = await comparePasswordHelper(pass, user.password);

    if (!isValidPassword) {
      return null;
    }
    return user;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      user: {
        email: user.email,
        _id: user._id,
        name: user.name,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async handleRegister(register: CreateAuthDto) {
    return await this.usersService.handelRegister(register);
  }

  async handleGoogleUser(data: CreateAuthGoogleDto) {
    return await this.usersService.handleGoogle(data);
  }

  async handleCheckCode(data: CodeAuthDto) {
    return await this.usersService.handleActive(data);
  }

  async retryActive(data: string) {
    return await this.usersService.handleRetry(data);
  }

  async retryPassword(data: string) {
    return await this.usersService.handleRetryPassword(data);
  }
  async changePassword(data: ChangePasswordDto) {
    return await this.usersService.handleChangePassword(data);
  }
}
