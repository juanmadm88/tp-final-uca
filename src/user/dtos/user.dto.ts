import { Expose, Type } from 'class-transformer';
import { IsOptional, IsString, IsNotEmpty, IsNumber, IsEmail, IsNotEmptyObject, ValidateNested, IsNumberString } from 'class-validator';
import { RoleDTO } from './role.dto';
import { ApiProperty } from '@nestjs/swagger';

/* istanbul ignore file */

export class UserDTO {
  constructor(args: any) {
    if (args) {
      const { lastName, firstName, email, dni, username, password, id, role } = args;
      if (lastName) this.lastName = lastName;
      if (firstName) this.firstName = firstName;
      if (email) this.email = email;
      if (dni) this.dni = dni;
      if (username) this.username = username;
      if (password) this.password = password;
      if (id) this.id = id;
      if (role) this.role = role;
    }
  }

  @ApiProperty({
    name: 'lastName',
    type: 'string',
    required: false,
    description: 'The User last name '
  })
  @Expose()
  @IsOptional()
  @IsString()
  private lastName?: string;

  @ApiProperty({
    name: 'firstName',
    type: 'string',
    required: false,
    description: 'The User first name '
  })
  @Expose()
  @IsOptional()
  @IsString()
  private firstName?: string;

  @ApiProperty({
    name: 'email',
    type: 'string',
    required: true,
    description: 'The User email '
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  private email: string;

  @ApiProperty({
    name: 'dni',
    type: 'string',
    required: true,
    description: 'The User dni '
  })
  @Expose()
  @IsNotEmpty()
  @IsNumberString()
  private dni: string;

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
    description: 'The User password '
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  private password: string;

  @ApiProperty({
    name: 'id',
    type: 'number',
    required: false,
    description: 'The User id '
  })
  @Expose()
  @IsOptional()
  @IsNumber()
  private id?: number;

  @ApiProperty({
    name: 'role',
    type: RoleDTO,
    required: true,
    description: 'The User Role '
  })
  @IsNotEmptyObject()
  @ValidateNested()
  @Expose()
  @Type(() => RoleDTO)
  private role: RoleDTO;

  public getRole(): RoleDTO {
    return this.role;
  }
  public setRole(role: RoleDTO) {
    this.role = role;
  }

  public getLastName(): string {
    return this.lastName;
  }
  public setLastName(lastName: string) {
    this.lastName = lastName;
  }
  public getFirstName(): string {
    return this.firstName;
  }
  public setFirstName(firstName: string) {
    this.firstName = firstName;
  }
  public getPassword(): string {
    return this.password;
  }
  public setPassword(password: string) {
    this.password = password;
  }
  public getEmail(): string {
    return this.email;
  }
  public setEmail(email: string) {
    this.email = email;
  }
  public getDni(): string {
    return this.dni;
  }
  public setDni(dni: string) {
    this.dni = dni;
  }
  public getUsername(): string {
    return this.username;
  }
  public setUsername(username: string) {
    this.username = username;
  }
  public getId(): number {
    return this.id;
  }
  public setId(id: number) {
    this.id = id;
  }
}
