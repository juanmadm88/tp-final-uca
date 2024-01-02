import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, ValidateNested, IsBoolean, IsOptional } from 'class-validator';
import { UpdateSeatDTO } from './update-seat.dto';

/* istanbul ignore file */

export class UpdateAutoBusDTO {
  constructor(args: any) {
    if (args) {
      const { id, seats, asigned } = args;
      if (id) this.id = id;
      if (seats) this.seats = seats;
      if (asigned) this.asigned = asigned;
    }
  }

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
    required: true,
    description: 'The Autobus id '
  })
  @Expose()
  @IsOptional()
  @IsNumber()
  private id?: number;

  @ApiProperty({
    name: 'seats',
    type: Array<UpdateSeatDTO>,
    required: true,
    description: 'An Array of seats '
  })
  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateSeatDTO)
  private seats?: Array<UpdateSeatDTO>;

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
  public getSeats(): Array<UpdateSeatDTO> {
    return this.seats;
  }
  public setSeats(value: Array<UpdateSeatDTO>) {
    this.seats = value;
  }
}
