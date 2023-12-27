import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

/* istanbul ignore file */

export class RoleDTO {
  constructor(args: any) {
    if (args) {
      const { description, id } = args;
      if (id) this.id = id;
      if (description) this.description = description;
    }
  }

  @Expose()
  @IsNotEmpty()
  @IsString()
  private description: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  private id?: number;

  public getDescription(): string {
    return this.description;
  }
  public setDescription(description: string) {
    this.description = description;
  }

  public getId(): number {
    return this.id;
  }
  public setId(id: number) {
    this.id = id;
  }
}
