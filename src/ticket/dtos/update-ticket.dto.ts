/* istanbul ignore file */

import { IsBoolean, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateSeatDTO } from '../../autobus/dtos/update-seat.dto';
import { UpdateServiceTypeDTO } from '../../service-type/dtos/update-service-type.dto';

export class UpdateTicketDTO {
  constructor(args: any) {
    if (args) {
      const { cancelled, seat, serviceType, id } = args;
      if (cancelled) this.cancelled = cancelled;
      if (seat) this.seat = seat;
      if (serviceType) this.serviceType = serviceType;
      if (id) this.id = id;
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
    name: 'seat',
    type: UpdateSeatDTO,
    required: false,
    description: 'Seat to be updated '
  })
  @IsOptional()
  @Expose()
  @ValidateNested()
  @Type(() => UpdateSeatDTO)
  private seat?: UpdateSeatDTO;

  @ApiProperty({
    name: 'serviceType',
    type: UpdateServiceTypeDTO,
    required: false,
    description: 'Type Service to be updated '
  })
  @IsOptional()
  @Expose()
  @ValidateNested()
  @Type(() => UpdateServiceTypeDTO)
  private serviceType?: UpdateServiceTypeDTO;

  @ApiProperty({
    name: 'id',
    type: 'number',
    required: false,
    description: 'The Ticket id '
  })
  @Expose()
  @IsOptional()
  @IsNumber()
  private id?: number;

  public getSeat(): UpdateSeatDTO {
    return this.seat;
  }
  public setSeat(value: UpdateSeatDTO) {
    return (this.seat = value);
  }

  public getCancelled(): boolean {
    return this.cancelled;
  }
  public setCancelled(value: boolean) {
    return (this.cancelled = value);
  }

  public getServiceType(): UpdateServiceTypeDTO {
    return this.serviceType;
  }
  public setServiceType(value: UpdateServiceTypeDTO) {
    return (this.serviceType = value);
  }

  public getId(): number {
    return this.id;
  }
  public setId(id: number) {
    this.id = id;
  }
}
