import {
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';
import { IUser } from 'src/users/users.interface';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('Login successfully')
  @Post('/login')
  handleLogin(@Req() req: any, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  @Public() // Use public to avoid need jwt token
  @ResponseMessage('Register a new user')
  @Post('/register')
  handleRegister(@Request() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @ResponseMessage('Get user infomation')
  @Get('/account')
  handleGetAccount(@User() user: IUser) {
    return { user };
  }
}
