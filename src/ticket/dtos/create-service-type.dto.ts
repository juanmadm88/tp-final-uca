import { Expose } from 'class-transformer';
import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/* istanbul ignore file */

export class CreateServiceTypeDTO {
  constructor(args: any) {
    if (args) {
      const { id } = args;
      if (id) this.id = id;
    }
  }

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
}
