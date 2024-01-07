import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsISO8601, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TerminalDTO } from '../../terminal/dtos/terminal.dto';

/* istanbul ignore file */

export class CreateTripDTO {
  constructor(args: any) {
    if (args) {
      const { id, departureDate, arrivalDate, origin, destination } = args;
      if (id) this.id = id;
      if (departureDate) this.departureDate = departureDate;
      if (arrivalDate) this.arrivalDate = arrivalDate;
      if (origin) this.origin = origin;
      if (destination) this.destination = destination;
    }
  }

  @ApiProperty({
    name: 'departureDate',
    type: 'datetime',
    required: false,
    description: 'The date of the trip departure '
  })
  @IsOptional()
  @IsISO8601()
  @Expose()
  private departureDate?: Date;

  @ApiProperty({
    name: 'arrivalDate',
    type: 'datetime',
    required: false,
    description: 'The date of the trip arrival '
  })
  @IsOptional()
  @IsISO8601()
  @Expose()
  private arrivalDate?: Date;

  @ApiProperty({
    name: 'id',
    type: 'number',
    required: false,
    description: 'The Trip id '
  })
  @Expose()
  @IsOptional()
  @IsNumber()
  private id: number;

  @ApiProperty({
    name: 'origin',
    type: TerminalDTO,
    required: false,
    description: 'The origin of the Trip '
  })
  @IsOptional()
  @ValidateNested()
  @Expose()
  @Type(() => TerminalDTO)
  private origin?: TerminalDTO;

  @ApiProperty({
    name: 'destination',
    type: TerminalDTO,
    required: false,
    description: 'The destination of the Trip '
  })
  @IsOptional()
  @ValidateNested()
  @Expose()
  @Type(() => TerminalDTO)
  private destination?: TerminalDTO;

  public getId(): number {
    return this.id;
  }
  public setId(id: number) {
    this.id = id;
  }
  public getDepartureDate(): Date {
    return this.departureDate;
  }
  public setDepartureDate(value: Date) {
    this.departureDate = value;
  }
  public getArrivalDate(): Date {
    return this.arrivalDate;
  }
  public setArrivalDate(value: Date) {
    this.arrivalDate = value;
  }
  public getOrigin(): TerminalDTO {
    return this.origin;
  }
  public setOrigin(value: TerminalDTO) {
    this.origin = value;
  }
  public getDestination(): TerminalDTO {
    return this.destination;
  }
  public setDestination(value: TerminalDTO) {
    this.destination = value;
  }
}
