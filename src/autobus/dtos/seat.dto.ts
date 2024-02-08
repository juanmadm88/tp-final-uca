import { IsBoolean, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { SeatTypeDTO } from './seat-type.dto';
import { ApiProperty } from '@nestjs/swagger';
/* istanbul ignore file */

export class SeatDTO {
  constructor(args: any) {
    if (args) {
      const { seatType, id, booked, row, column } = args;
      if (id) this.id = id;
      if (seatType) this.seatType = seatType;
      if (booked) this.booked = booked;
      if (row) this.row = row;
      if (column) this.column = column;
    }
  }
  @ApiProperty({
    name: 'seatType',
    type: SeatTypeDTO,
    required: true,
    description: 'The Seat type '
  })
  @IsNotEmptyObject()
  @ValidateNested()
  @Expose()
  @Type(() => SeatTypeDTO)
  private seatType: SeatTypeDTO;

  @ApiProperty({
    name: 'id',
    type: 'number',
    required: false,
    description: 'The Seat id '
  })
  @Expose()
  @IsOptional()
  @IsNumber()
  private id?: number;

  @ApiProperty({
    name: 'booked',
    type: 'boolean',
    required: false,
    description: 'Indicates whether The Seat is booked or not ',
    default: false
  })
  @Expose()
  @IsOptional()
  @IsBoolean()
  private booked?: boolean;

  @ApiProperty({
    name: 'row',
    type: 'number',
    required: true,
    description: 'The Seat row'
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  private row: number;

  @ApiProperty({
    name: 'column',
    type: 'number',
    required: true,
    description: 'The Seat column'
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  private column: number;

  public getSeatType(): SeatTypeDTO {
    return this.seatType;
  }
  public setSeatType(value: SeatTypeDTO) {
    this.seatType = value;
  }
  public getId(): number {
    return this.id;
  }
  public setId(id: number) {
    this.id = id;
  }
  public getBooked(): boolean {
    return this.booked;
  }
  public setBooked(value: boolean) {
    this.booked = value;
  }
  public getColumn(): number {
    return this.column;
  }
  public setColumn(column: number) {
    this.column = column;
  }
  public getRow(): number {
    return this.row;
  }
  public setRow(row: number) {
    this.row = row;
  }
}
