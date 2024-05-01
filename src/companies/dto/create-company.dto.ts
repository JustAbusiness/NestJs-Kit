import { IsNotEmpty } from 'class-validator';
export class CreateCompanyDto {
  @IsNotEmpty({
    message: 'Name không được để trống',
  })
  name: string;

  @IsNotEmpty({
    message: 'Mô tả, Địa chỉ không để trống',
  })
  description: string;
  address: string;
}
