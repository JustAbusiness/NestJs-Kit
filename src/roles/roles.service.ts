import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import {
  BadRequestException,
  Body,
  Injectable,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RolesDocument } from './schema/role.schema';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { User } from 'src/decorator/customize';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RolesDocument>,
  ) {}

  async create(createRoleDto: CreateRoleDto, user: IUser) {
    const { name, description, isActive, permissions } = createRoleDto;

    const isExit = await this.roleModel.findOne({ name });
    if (isExit) {
      throw new BadRequestException(`Role name=${name} is already exist`);
    }
    const newRole = await this.roleModel.create({
      name,
      description,
      isActive,
      permissions,
      createdBy: {
        _id: user?._id,
        email: user.email,
      },
    });

    return {
      _id: newRole?._id,
      createdAt: newRole?.createdAt,
    };
  }

  async findAll(currentPage: string, limit: string, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.page;
    delete filter.limit;
    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.roleModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.roleModel
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
      throw new BadRequestException('Not found this role');
    }
    return (await this.roleModel.findById(id)).populate({
      path: 'permissions',
      select: { _id: 1, apiPath: 1, method: 1 },
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
    @User() user: IUser,
  ) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Not found id role');
    }

    const { name, description, isActive, permissions } = updateRoleDto;

    const isExit = await this.roleModel.findOne({ name });
    if (isExit) {
      throw new BadRequestException('Role is already exist');
    }

    const updated = await this.roleModel.updateOne(
      { _id: id },
      {
        description,
        isActive,
        name,
        permissions,
        updatedBy: {
          _id: user?._id,
          email: user?.email,
        },
      },
    );
    return updated;
  }

  async remove(id: string, user: IUser) {
    await this.roleModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user?._id,
          email: user?.email,
        },
      },
    );
    return this.roleModel.softDelete({ _id: id });
  }
}
