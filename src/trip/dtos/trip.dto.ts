import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsOptional, IsNumber, IsNotEmptyObject, ValidateNested, IsISO8601, IsNotEmpty, IsBoolean } from 'class-validator';
import { TerminalDTO } from '../../terminal/dtos/terminal.dto';
import { AutoBusDTO } from '../../autobus/dtos/autobus.dto';
/* istanbul ignore file */
export class TripDTO {
  constructor(args: any) {
    if (args) {
      const { id, departureDate, arrivalDate, autobus, origin, destination, finished } = args;
      if (id) this.id = id;
      if (departureDate) this.departureDate = departureDate;
      if (arrivalDate) this.arrivalDate = arrivalDate;
      if (autobus) this.autobus = autobus;
      if (origin) this.origin = origin;
      if (destination) this.destination = destination;
      if (finished) this.finished = finished;
    }
  }
  @ApiProperty({
    name: 'departureDate',
    type: 'datetime',
    required: true,
    description: 'The date of the trip departure '
  })
  @IsNotEmpty()
  @IsISO8601()
  @Expose()
  private departureDate: Date;

  @ApiProperty({
    name: 'arrivalDate',
    type: 'datetime',
    required: true,
    description: 'The date of the trip arrival '
  })
  @IsNotEmpty()
  @IsISO8601()
  @Expose()
  private arrivalDate: Date;

  @ApiProperty({
    name: 'origin',
    type: TerminalDTO,
    required: true,
    description: 'The origin of the Trip '
  })
  @IsNotEmptyObject()
  @ValidateNested()
  @Expose()
  @Type(() => TerminalDTO)
  private origin: TerminalDTO;

  @ApiProperty({
    name: 'destination',
    type: TerminalDTO,
    required: true,
    description: 'The destination of the Trip '
  })
  @IsNotEmptyObject()
  @ValidateNested()
  @Expose()
  @Type(() => TerminalDTO)
  private destination: TerminalDTO;

  @ApiProperty({
    name: 'id',
    type: 'number',
    required: false,
    description: 'The Trip id '
  })
  @Expose()
  @IsOptional()
  @IsNumber()
  private id?: number;

  @ApiProperty({
    name: 'autobus',
    type: AutoBusDTO,
    required: true,
    description: 'The Autobus asigned to the trip '
  })
  @IsNotEmptyObject()
  @ValidateNested()
  @Expose()
  @Type(() => AutoBusDTO)
  private autobus: AutoBusDTO;

  @ApiProperty({
    name: 'finished',
    type: 'boolean',
    required: false,
    description: 'Indicates whether the Trip is finished or not ',
    default: false
  })
  @Expose()
  @IsOptional()
  @IsBoolean()
  private finished?: boolean;

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
  public getAutobus(): AutoBusDTO {
    return this.autobus;
  }
  public setAutobus(value: AutoBusDTO) {
    this.autobus = value;
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
  public getFinished(): boolean {
    return this.finished;
  }
  public setFinished(value: boolean) {
    this.finished = value;
  }
}
