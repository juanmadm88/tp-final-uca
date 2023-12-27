import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({
    name: 'description',
    type: 'string',
    required: true,
    description: 'The Role description '
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  private description: string;

  @ApiProperty({
    name: 'id',
    type: 'number',
    required: false,
    description: 'The Role id '
  })
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
