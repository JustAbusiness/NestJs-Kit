import { IUser } from './../users/users.interface';
import {
  BadRequestException,
  Body,
  Injectable,
  Param,
  Patch,
} from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import aqp from 'api-query-params';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import { User } from 'src/decorator/customize';
import { PermissionsDocument, Permissions } from './schema/permission.schema';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permissions.name)
    private permissionModel: SoftDeleteModel<PermissionsDocument>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto, user: IUser) {
    const { name, apiPath, method, module } = createPermissionDto;
    const isExit = await this.permissionModel.findOne({
      apiPath,
      method,
    });

    if (isExit) {
      throw new BadRequestException('Permission is already exist');
    }

    const newPermission = await this.permissionModel.create({
      name,
      apiPath,
      method,
      module,
      createdBy: {
        _id: user?._id,
        email: user.email,
      },
    });

    return {
      _id: newPermission?._id,
      createdAt: newPermission?.createdAt,
    };
  }

  async findAll(currentPage: string, limit: string, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.page;
    delete filter.limit;
    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.permissionModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.permissionModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Not found id permission');
    }
    return await this.permissionModel.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
    @User() user: IUser,
  ) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Not found id permission');
    }

    const { module, method, apiPath, name } = updatePermissionDto;
    const updated = await this.permissionModel.updateOne(
      { _id: id },
      {
        module,
        method,
        apiPath,
        name,
        updatedBy: {
          _id: user?._id,
          email: user?.email,
        },
      },
    );
    return updated;
  }

  async remove(id: string, user: IUser) {
    await this.permissionModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user?._id,
          email: user?.email,
        },
      },
    );
    return this.permissionModel.softDelete({ _id: id });
  }
}
