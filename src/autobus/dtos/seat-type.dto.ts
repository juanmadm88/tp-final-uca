import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';

/* istanbul ignore file */

export class SeatTypeDTO {
  constructor(args: any) {
    if (args) {
      const { description, id, isActive } = args;
      if (id) this.id = id;
      if (description) this.description = description;
      if (isActive) this.isActive = isActive;
    }
  }

  @ApiProperty({
    name: 'description',
    type: 'string',
    required: true,
    description: 'The Seat Type description '
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  private description: string;

  @ApiProperty({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The Seat Type id '
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  private id: number;

  @ApiProperty({
    name: 'isActive',
    type: 'boolean',
    required: false,
    description: 'Indicates whether is Seat is active or not '
  })
  @Expose()
  @IsOptional()
  @IsBoolean()
  private isActive?: boolean;

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

  public getIsActive(): boolean {
    return this.isActive;
  }
  public setIsActive(isActive: boolean) {
    this.isActive = isActive;
  }
}
