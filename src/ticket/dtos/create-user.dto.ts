import { Expose } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/* istanbul ignore file */

export class CreateUserDTO {
  constructor(args: any) {
    if (args) {
      const { id, username } = args;
      if (id) this.id = id;
      if (username) this.username = username;
    }
  }

  @ApiProperty({
    name: 'id',
    type: 'number',
    required: false,
    description: 'The User id '
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  private id: number;

  @ApiProperty({
    name: 'username',
    type: 'string',
    required: false,
    description: 'The User username '
  })
  @Expose()
  @IsOptional()
  @IsString()
  private username?: string;

  public getId(): number {
    return this.id;
  }
  public setId(id: number) {
    this.id = id;
  }

  public getUsername(): string {
    return this.username;
  }
  public setUsername(username: string) {
    this.username = username;
  }
}
