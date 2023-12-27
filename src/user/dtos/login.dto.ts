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

  @Expose()
  @IsNotEmpty()
  @IsString()
  private username: string;

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
