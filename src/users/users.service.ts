import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose from 'mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
  ) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  async create(createUserDto: CreateUserDto) {
    const hash = this.getHashPassword(createUserDto.password);
    const user = await this.userModel.create({
      email: createUserDto.email,
      password: hash,
      name: createUserDto.name,
      address: createUserDto.address,
    });
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return `User not found : ${id}`;
  }

  findOneByUserName(username: string) {
    return this.userModel.findOne({ email: username });
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      {
        _id: updateUserDto._id,
      },
      { ...UpdateUserDto },
    );
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return `User not found : ${id}`;
    return this.userModel.deleteOne({ _id: id });
  }
}
