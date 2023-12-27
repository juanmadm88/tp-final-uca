import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDTO, LoginDTO } from '../user/dtos';
import { Constants } from '../constants';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Jwt } from './common';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  async signUp(dto: UserDTO): Promise<UserDTO> {
    const user: UserDTO = await this.userService.findAnUser({
      username: dto.getUsername()
    });
    if (user && Object.keys(user).length > 0)
      throw new BadRequestException(Constants.USER_ALREADY_EXISTS);
    dto.setPassword(
      await bcrypt.hash(
        dto.getPassword(),
        this.configService.get<number>('appConfig.salt')
      )
    );
    return this.userService.createUser(dto);
  }

  async login(dto: LoginDTO): Promise<Jwt> {
    const user: UserDTO = await this.userService.findAnUser({
      username: dto.getUsername()
    });
    if (!user || !(await bcrypt.compare(dto.getPassword(), user.getPassword())))
      throw new UnauthorizedException(Constants.WRONG_PASSWORD_USERNAME);
    return {
      access_token: await this.jwtService.signAsync({
        id: user.getId(),
        username: user.getUsername()
      }),
      user
    };
  }
}
