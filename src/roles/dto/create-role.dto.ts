import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'Description không được để trống' })
  description: string;

  @IsNotEmpty({ message: 'isActive không được để trống' })
  @IsBoolean({ message: 'isActive phải có giá trị boolean' })
  isActive: boolean;

  @IsNotEmpty({ message: 'Permissions không được để trống' })
  @IsMongoId({ each: true, message: 'Permissions phải có giá trị ObjectId' })
  @IsArray({ message: 'Permissions phải có định dạng array' })
  permissions: mongoose.Schema.Types.ObjectId[];
}
