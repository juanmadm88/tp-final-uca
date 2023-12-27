import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UtilsService } from '../utils/utils.service';
import { UserDTO } from './dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private utils: UtilsService
  ) {}
  async createUser(dto: UserDTO): Promise<UserDTO> {
    const user: User = new User();
    user.email = dto.getEmail();
    user.dni = dto.getDni();
    user.lastName = dto.getLastName();
    user.firstName = dto.getFirstName();
    user.password = dto.getPassword();
    user.username = dto.getUsername();
    return this.utils.buildDTO(await this.userRepository.save(user), UserDTO);
  }
  async findAnUser(args: any): Promise<UserDTO> {
    return this.utils.buildDTO(
      await this.userRepository.findOneBy(args),
      UserDTO
    );
  }
}
