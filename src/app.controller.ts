import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/user')
  getHello(): string {
    return this.appService.getHello();
  }

  getHello1(): string {
    return this.appService.getHello();
  }
}
