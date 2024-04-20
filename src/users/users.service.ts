import { Injectable } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  instrictor = getSaltModel(this.userModel);
  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(email: string, password: string, name: string) {
    const hash = await this.userModel.create({ email, password, name });
    return hash;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
function getSaltModel(userModel: Model<User, {}, {}, {}, import("mongoose").Document<unknown, {}, User> & User & { _id: import("mongoose").Types.ObjectId; }, any>) {
  throw new Error('Function not implemented.');
}

