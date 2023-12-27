import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

/* istanbul ignore file */

export class LoginDTO {
  constructor(args: any) {
    if (args) {
      const { username, password } = args;
      if (username) this.username = username;
      if (password) this.password = password;
    }
  }
  @ApiProperty({
    name: 'username',
    type: 'string',
    required: true,
    description: 'The User Name '
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  private username: string;

  @ApiProperty({
    name: 'password',
    type: 'string',
    required: true,
    description: 'The User Password '
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  private password: string;

  public getPassword(): string {
    return this.password;
  }
  public setPassword(password: string) {
    this.password = password;
  }
  public getUsername(): string {
    return this.username;
  }
  public setUsername(username: string) {
    this.username = username;
  }
}
