import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsOptional, IsNumber, IsNotEmptyObject, ValidateNested, IsBoolean, IsArray } from 'class-validator';
import { ModelDTO } from './model.dto';
import { BrandDTO } from './brand.dto';
import { SeatDTO } from './seat.dto';

/* istanbul ignore file */

export class AutoBusDTO {
  constructor(args: any) {
    if (args) {
      const { model, id, brand, seats, asigned } = args;
      if (id) this.id = id;
      if (model) this.model = model;
      if (brand) this.brand = brand;
      if (seats) this.seats = seats;
      if (asigned) this.asigned = asigned;
    }
  }
  @ApiProperty({
    name: 'model',
    type: ModelDTO,
    required: true,
    description: 'The Model of the Autobus'
  })
  @IsNotEmptyObject()
  @ValidateNested()
  @Expose()
  @Type(() => ModelDTO)
  private model: ModelDTO;

  @ApiProperty({
    name: 'brand',
    type: BrandDTO,
    required: true,
    description: 'The Brand of the Autobus'
  })
  @IsNotEmptyObject()
  @ValidateNested()
  @Expose()
  @Type(() => BrandDTO)
  private brand: BrandDTO;

  @ApiProperty({
    name: 'asigned',
    type: 'boolean',
    required: false,
    description: 'Indicates whether The Autobus is asigned or not ',
    default: false
  })
  @Expose()
  @IsBoolean()
  @IsOptional()
  private asigned?: boolean;

  @ApiProperty({
    name: 'id',
    type: 'number',
    required: false,
    description: 'The Autobus id '
  })
  @Expose()
  @IsOptional()
  @IsNumber()
  private id?: number;

  @ApiProperty({
    name: 'seats',
    type: Array<SeatDTO>,
    required: true,
    description: 'An Array of seats '
  })
  @Expose()
  @IsArray()
  @ValidateNested()
  @Type(() => SeatDTO)
  private seats: Array<SeatDTO>;

  public getId(): number {
    return this.id;
  }
  public setId(id: number) {
    this.id = id;
  }
  public getAsigned(): boolean {
    return this.asigned;
  }
  public setAsigned(value: boolean) {
    this.asigned = value;
  }
  public getModel(): ModelDTO {
    return this.model;
  }
  public setModel(value: ModelDTO) {
    this.model = value;
  }
  public getBrand(): BrandDTO {
    return this.brand;
  }
  public setBrand(value: BrandDTO) {
    this.brand = value;
  }
  public getSeats(): Array<SeatDTO> {
    return this.seats;
  }
  public setSeats(value: Array<SeatDTO>) {
    this.seats = value;
  }
}
