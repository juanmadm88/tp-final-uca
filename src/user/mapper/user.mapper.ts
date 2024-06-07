import { Injectable } from '@nestjs/common';
import { IMapper } from '../../constants/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UserMapper implements IMapper {
  public transform(data: any): User {
    const response: User = new User();
    response.email = data.getEmail();
    response.dni = data.getDni();
    if (data.getLastName()) response.lastName = data.getLastName();
    if (data.getFirstName()) response.firstName = data.getFirstName();
    response.password = data.getPassword();
    data.username = data.getUsername();
    data.role = data.getRole();
    return response;
  }
}
