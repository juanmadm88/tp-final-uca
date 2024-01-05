import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsOptional, IsNumber, IsNotEmptyObject, ValidateNested, IsArray } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';
import { CreateTripDTO } from './create-trip.dto';
import { CreateSeatDTO } from './create-seat.dto';
import { CreateServiceTypeDTO } from './create-service-type.dto';

/* istanbul ignore file */

export class TicketDTO {
  constructor(args: any) {
    if (args) {
      const { price, id, user, seats, trip, serviceType } = args;
      if (id) this.id = id;
      if (price) this.price = price;
      if (user) this.user = user;
      if (seats) this.seats = seats;
      if (trip) this.trip = trip;
      if (serviceType) this.serviceType = serviceType;
    }
  }
  @ApiProperty({
    name: 'user',
    type: CreateUserDTO,
    required: true,
    description: 'The User that booked the ticket'
  })
  @IsNotEmptyObject()
  @ValidateNested()
  @Expose()
  @Type(() => CreateUserDTO)
  private user: CreateUserDTO;

  @ApiProperty({
    name: 'trip',
    type: CreateTripDTO,
    required: true,
    description: 'The trip booked'
  })
  @IsNotEmptyObject()
  @ValidateNested()
  @Expose()
  @Type(() => CreateTripDTO)
  private trip: CreateTripDTO;

  @ApiProperty({
    name: 'price',
    type: 'decimal',
    required: false,
    description: 'The price of the ticket '
  })
  @Expose()
  @IsNumber()
  @IsOptional()
  private price?: number;

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

  @ApiProperty({
    name: 'seats',
    type: Array<CreateSeatDTO>,
    required: true,
    description: 'An Array of seats '
  })
  @Expose()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateSeatDTO)
  private seats: Array<CreateSeatDTO>;

  @ApiProperty({
    name: 'serviceType',
    type: CreateServiceTypeDTO,
    required: true,
    description: 'The Service Type'
  })
  @IsNotEmptyObject()
  @ValidateNested()
  @Expose()
  @Type(() => CreateServiceTypeDTO)
  private serviceType: CreateServiceTypeDTO;

  public getId(): number {
    return this.id;
  }
  public setId(id: number) {
    this.id = id;
  }
  public getUser(): CreateUserDTO {
    return this.user;
  }
  public setUser(value: CreateUserDTO) {
    this.user = value;
  }
  public getTrip(): CreateTripDTO {
    return this.trip;
  }
  public setTrip(value: CreateTripDTO) {
    this.trip = value;
  }
  public getSeats(): Array<CreateSeatDTO> {
    return this.seats;
  }
  public setSeats(value: Array<CreateSeatDTO>) {
    this.seats = value;
  }
  public getPrice(): number {
    return this.price;
  }
  public setPrice(value: number) {
    this.price = value;
  }
  public getServiceType(): CreateServiceTypeDTO {
    return this.serviceType;
  }
  public setServiceType(value: CreateServiceTypeDTO) {
    this.serviceType = value;
  }
}
