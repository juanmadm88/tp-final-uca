import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

/* istanbul ignore file */

export class TerminalDTO {
  constructor(args: any) {
    if (args) {
      const { description, id, kilometer } = args;
      if (id) this.id = id;
      if (description) this.description = description;
      if (kilometer) this.kilometer = kilometer;
    }
  }

  @ApiProperty({
    name: 'description',
    type: 'string',
    required: true,
    description: 'The Terminal description '
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  private description: string;

  @ApiProperty({
    name: 'id',
    type: 'number',
    required: false,
    description: 'The Terminal id '
  })
  @Expose()
  @IsOptional()
  @IsNumber()
  private id?: number;

  @ApiProperty({
    name: 'id',
    type: 'number',
    required: false,
    description: 'The Terminal kilometer '
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  private kilometer: number;

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
  public getKilometer(): number {
    return this.kilometer;
  }
  public setKilometer(kilometer: number) {
    this.kilometer = kilometer;
  }
}
