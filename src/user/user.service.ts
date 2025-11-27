import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UtilsService } from '../utils/utils.service';
import { UserDTO } from './dtos';
import { UserMapper } from './mapper/user.mapper';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private utils: UtilsService, private mapper: UserMapper) {}
  async createUser(dto: UserDTO): Promise<UserDTO> {
    const user: User = this.mapper.transform(dto);
    return this.utils.buildDTO(await this.userRepository.save(user), UserDTO);
  }
  async findAnUser(args: any): Promise<UserDTO> {
    return this.utils.buildDTO(await this.userRepository.findOneBy(args), UserDTO);
  }
}
