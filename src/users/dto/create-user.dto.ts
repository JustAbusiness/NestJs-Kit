import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
// Validate Object
import { Type } from 'class-transformer';
import mongoose from 'mongoose';

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Name không để trống',
  })
  name: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({
    message: 'Email không được để trống',
  })
  email: string;

  @IsNotEmpty({
    message: 'Mật khẩu không để trống',
  })
  password: string;

  @IsNotEmpty({
    message: 'Tuổi không để trống',
  })
  age: number;

  @IsNotEmpty({
    message: 'Giới tính không để trống',
  })
  gender: string;

  @IsNotEmpty({
    message: 'Địa chỉ không để trống',
  })
  address: string;

  @IsNotEmpty({
    message: 'Vai trò không để trống',
  })
  @IsMongoId({ message: 'Role có định dạng là mongo id' })
  role: string;

  // Validate Object
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company!: Company;
  // private _id: any | ObjectId;
}

export class RegisterUserDto {
  @IsNotEmpty({
    message: 'Name không để trống',
  })
  name: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({
    message: 'Email không được để trống',
  })
  email: string;

  @IsNotEmpty({
    message: 'Mật khẩu không để trống',
  })
  password: string;

  @IsNotEmpty({
    message: 'Tuổi không để trống',
  })
  age: number;

  @IsNotEmpty({
    message: 'Gioi tinh không là một',
  })
  gender: string;

  @IsNotEmpty({
    message: 'Địa chỉ không để trống',
  })
  address: string;
}
