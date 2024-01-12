/* istanbul ignore file */

import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateSeatDTO } from '../../autobus/dtos/update-seat.dto';

export class UpdateTicketDTO {
  constructor(args: any) {
    if (args) {
      const { cancelled, seats } = args;
      if (cancelled) this.cancelled = cancelled;
      if (seats) this.seats = seats;
    }
  }
  @ApiProperty({
    name: 'cancelled',
    type: 'boolean',
    required: false,
    description: 'Indicates whether the ticket is cancelled or not '
  })
  @IsOptional()
  @Expose()
  @IsBoolean()
  private cancelled?: boolean;

  @ApiProperty({
    name: 'seats',
    type: Array<UpdateSeatDTO>,
    required: false,
    description: 'Array of seats to be updated '
  })
  @IsOptional()
  @Expose()
  @ValidateNested()
  @Type(() => UpdateSeatDTO)
  private seats?: Array<UpdateSeatDTO>;

  public getSeats(): Array<UpdateSeatDTO> {
    return this.seats;
  }
  public setSeats(value: Array<UpdateSeatDTO>) {
    return (this.seats = value);
  }

  public getCancelled(): boolean {
    return this.cancelled;
  }
  public setCancelled(value: boolean) {
    return (this.cancelled = value);
  }
}
