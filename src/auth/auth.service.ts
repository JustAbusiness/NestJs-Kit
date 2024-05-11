import { BadGatewayException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(username);
    if (user) {
      const isValidPassword = this.usersService.isValidPassword(
        pass,
        user.password,
      );
      if (isValidPassword === true) {
        return user;
      }
    }

    return null;
  }

  async login(user: IUser, response: Response) {
    const { _id, name, email, role } = user;
    const payload = {
      sub: 'token login',
      iss: 'from server',
      _id,
      name,
      email,
      role,
    };
    const refreshToken = this.createRefreshToken(payload);

    // Update user with refresh token
    await this.usersService.updateUserToken(_id, refreshToken);

    // set refresh token as cookie
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_EXPIRED_TOKEN')) * 1000,
    });
    return {
      token: this.jwtService.sign(payload),
      user: {
        _id,
        name,
        email,
        role,
      },
    };
  }

  async register(user: RegisterUserDto) {
    const newUser = await this.usersService.register(user);
    return {
      _id: newUser?._id,
      createdBy: newUser?.createdBy,
    };
  }

  createRefreshToken = (payload) => {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRED_TOKEN'),
    });
    return refreshToken;
  };

  processNewToken = (refreshToken: string) => {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch (error) {
      throw new BadGatewayException(
        'Refresh token không hợp lệ, vui lòng đăng nhập lại',
      );
    }
  };
}
