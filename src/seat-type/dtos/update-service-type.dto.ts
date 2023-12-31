import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

/* istanbul ignore file */

export class UpdateSeatTypeDTO {
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
    description: 'The Update Seat Type description '
  })
  @Expose()
  @IsOptional()
  @IsString()
  private description?: string;

  @ApiProperty({
    name: 'id',
    type: 'number',
    required: false,
    description: 'The Update Seat Type id '
  })
  @Expose()
  @IsOptional()
  @IsNumber()
  private id?: number;

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
