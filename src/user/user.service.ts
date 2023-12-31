import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UtilsService } from '../utils/utils.service';
import { UserDTO } from './dtos';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private utils: UtilsService) {}
  async createUser(dto: UserDTO): Promise<UserDTO> {
    const user: User = this.buildUserEntity(dto);
    return this.utils.buildDTO(await this.userRepository.save(user), UserDTO);
  }
  async findAnUser(args: any): Promise<UserDTO> {
    return this.utils.buildDTO(await this.userRepository.findOneBy(args), UserDTO);
  }
  private buildUserEntity(dto: UserDTO): User {
    const user: User = new User();
    user.email = dto.getEmail();
    user.dni = dto.getDni();
    if (dto.getLastName()) user.lastName = dto.getLastName();
    if (dto.getFirstName()) user.firstName = dto.getFirstName();
    user.password = dto.getPassword();
    user.username = dto.getUsername();
    user.role = dto.getRole() as any;
    return user;
  }
}
