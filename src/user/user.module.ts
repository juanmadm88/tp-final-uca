import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { UserMapper } from './mapper/user.mapper';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UserService, UserMapper],
  exports: [UserService]
})
export class UserModule {}
