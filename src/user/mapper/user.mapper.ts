import { Injectable } from '@nestjs/common';
import { IMapper } from '../../constants/common';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';

@Injectable()
export class UserMapper implements IMapper {
  public transform(data: any): User {
    const response: User = new User();
    response.email = data.getEmail();
    response.dni = data.getDni();
    if (data.getLastName()) response.lastName = data.getLastName();
    if (data.getFirstName()) response.firstName = data.getFirstName();
    response.password = data.getPassword();
    response.username = data.getUsername();
    if (data.getRole()) {
      const role: Role = new Role();
      response.role = role;
      if (data.getRole().getId()) response.role.id = data.getRole().getId();
      if (data.getRole().getDescription()) response.role.description = data.getRole().getDescription();
    }
    return response;
  }
}
