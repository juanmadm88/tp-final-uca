import { Injectable } from '@nestjs/common';
import { IMapper } from '../../constants/common';
import { User } from '../../user/entities/user.entity';
import { Ticket } from '../entities/ticket.entity';
import { ServiceType } from '../../service-type/entities/service-type.entity';
import { CreateSeatDTO } from '../dtos/create-seat.dto';
import { Trip } from '../../trip/entities/trip.entity';
import { Seat } from '../../autobus/entities/seat.entity';

@Injectable()
export class TicketMapper implements IMapper {
  public transform(data: any): Ticket {
    const ticket: Ticket = new Ticket();
    ticket.price = data.price;
    ticket.serviceType = new ServiceType();
    ticket.serviceType.id = data.getServiceType().getId();
    ticket.user = new User();
    ticket.user.id = data.getUser().getId();
    ticket.trip = new Trip();
    ticket.trip.id = data.getTrip().getId();
    const seatDto: CreateSeatDTO = data.getSeat();
    ticket.seat = new Seat();
    ticket.seat.id = seatDto.getId();
    if ('booked' in seatDto && seatDto.getBooked() != undefined) ticket.seat.booked = seatDto.getBooked();
    return ticket;
  }
}
