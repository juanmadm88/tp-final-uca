import { Expose } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEmail
} from 'class-validator';

/* istanbul ignore file */

export class UserDTO {
  constructor(args: any) {
    if (args) {
      const { lastName, firstName, email, dni, username, password, id } = args;
      if (lastName) this.lastName = lastName;
      if (firstName) this.firstName = firstName;
      if (email) this.email = email;
      if (dni) this.dni = dni;
      if (username) this.username = username;
      if (password) this.password = password;
      if (id) this.id = id;
    }
  }

  @Expose()
  @IsOptional()
  @IsString()
  private lastName?: string;

  @Expose()
  @IsOptional()
  @IsString()
  private firstName?: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  private email: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  private dni: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  private username: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  private password: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  private id?: number;

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
