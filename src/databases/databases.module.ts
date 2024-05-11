import { Module } from '@nestjs/common';
import { DatabasesService } from './databases.service';
import { DatabasesController } from './databases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/users/schemas/user.schema';
import {
  PermissionsSchema,
  Permissions,
} from 'src/permissions/schema/permission.schema';
import { Role, RolesSchema } from 'src/roles/schema/role.schema';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [DatabasesController],
  providers: [DatabasesService, UsersService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Permissions.name, schema: PermissionsSchema },
      { name: Role.name, schema: RolesSchema },
    ]),
    UsersModule,
  ],
})
export class DatabasesModule {}
