import { Expose } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/* istanbul ignore file */

export class CreateSeatDTO {
  constructor(args: any) {
    if (args) {
      const { id, booked } = args;
      if (id) this.id = id;
      if (booked) this.booked = booked;
    }
  }

  @ApiProperty({
    name: 'id',
    type: 'number',
    required: false,
    description: 'The Seat id '
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  private id: number;

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
}
