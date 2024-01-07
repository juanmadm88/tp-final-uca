import { Expose } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/* istanbul ignore file */

export class CreateServiceTypeDTO {
  constructor(args: any) {
    if (args) {
      const { id, description } = args;
      if (id) this.id = id;
      if (description) this.description = description;
    }
  }

  @ApiProperty({
    name: 'description',
    type: 'string',
    required: true,
    description: 'The Service Type description '
  })
  @Expose()
  @IsOptional()
  @IsString()
  private description?: string;

  @ApiProperty({
    name: 'id',
    type: 'number',
    required: false,
    description: 'The Service Type id '
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  private id: number;

  public getId(): number {
    return this.id;
  }
  public setId(id: number) {
    this.id = id;
  }
  public getDescription(): string {
    return this.description;
  }
  public setDescription(description: string) {
    this.description = description;
  }
}
