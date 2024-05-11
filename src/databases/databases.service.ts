import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import {
  Permissions,
  PermissionsDocument,
} from 'src/permissions/schema/permission.schema';
import { Role, RolesDocument } from 'src/roles/schema/role.schema';
import { UserDocument, User } from 'src/users/schemas/user.schema';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from './sample';

@Injectable()
export class DatabasesService implements OnModuleInit {
  private readonly logger = new Logger(DatabasesService.name);
  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Role.name) private roleModel: SoftDeleteModel<RolesDocument>,
    @InjectModel(Permissions.name)
    private permissionModel: SoftDeleteModel<PermissionsDocument>,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

  async onModuleInit() {
    const isInit = this.configService.get<string>('SHOULD_INIT');
    if (Boolean(isInit)) {
      const countUser = await this.userModel.countDocuments({});
      const countPermission = await this.permissionModel.countDocuments({});
      const countRole = await this.roleModel.countDocuments({});

      // create permissions
      if (countPermission === 0) {
        await this.permissionModel.insertMany(INIT_PERMISSIONS);
      }

      // create role
      if (countRole === 0) {
        const permissions = await this.permissionModel.find({}).select('_id');
        await this.roleModel.insertMany([
          {
            name: ADMIN_ROLE,
            description: 'Admin role',
            isActive: true,
            permissions: permissions,
          },
          {
            name: USER_ROLE,
            description: 'User role',
            isActive: true,
            permissions: [], // ko set quyển, chỉ cần add role
          },
        ]);
      }

      // create user
      if (countUser === 0) {
        const adminRole = await this.roleModel.findOne({ name: ADMIN_ROLE });
        const userRole = await this.roleModel.findOne({ name: USER_ROLE });
        await this.userModel.insertMany([
          {
            name: 'I am admin',
            email: 'admin@example.com',
            password: this.usersService.getHashPassword(
              this.configService.get<string>('INIT_PASSWORD'),
            ),
            age: 18,
            gender: 'MALE',
            address: 'Can Tho',
            role: adminRole?._id,
          },
          {
            name: 'I am user',
            email: 'user@example.com',
            password: this.usersService.getHashPassword(
              this.configService.get<string>('INIT_PASSWORD'),
            ),
            age: 22,
            gender: 'MALE',
            address: 'Ho Chi Minh',
            role: userRole?._id,
          },
        ]);
      }

      if (countUser > 0 && countPermission > 0 && countRole > 0) {
        this.logger.log('Init databases successfully');
      }
    }
  }
}
