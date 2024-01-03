import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
/* istanbul ignore file */
export class UpdateAutobusDTO {
  constructor(args: any) {
    if (args) {
      const { id } = args;
      if (id) this.id = id;
    }
  }
  @ApiProperty({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The Autobus id to be updated '
  })
  @IsNotEmpty()
  @Expose()
  @IsNumber()
  private id: number;

  public getId(): number {
    return this.id;
  }
  public setId(value: number) {
    this.id = value;
  }
}
