import { BadRequestException, Injectable } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { TicketDTO } from './dtos/ticket.dto';
import { DataSource } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { ServiceType } from '../service-type/entities/service-type.entity';
import { User } from '../user/entities/user.entity';
import { Trip } from '../trip/entities/trip.entity';
import { CreateSeatDTO } from './dtos/create-seat.dto';
import { Seat } from '../autobus/entities/seat.entity';
import { Constants } from '../constants';

//TODO: HAY QUE AGREGAR LA LOGICA PARA CALCULAR EL PRECIO DEL TICKET
@Injectable()
export class TicketService {
  constructor(private utils: UtilsService, private dataSource: DataSource) {}
  async create(dto: TicketDTO): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const seats: Array<CreateSeatDTO> = dto.getSeats();
      const ids: Array<number> = seats.map((seat: CreateSeatDTO) => {
        return seat.getId();
      });
      const seatsDB: Array<Seat> = await this.dataSource.getRepository(Seat).createQueryBuilder('seat').where('seat.id IN (:...ids)', { ids }).getMany();
      seatsDB.forEach((seat: Seat) => {
        if (seat.booked) throw new BadRequestException(Constants.SEAT_ALREADY_BOOKED);
      });
      await queryRunner.manager.save(this.buildTicketEntity(dto));
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  private buildTicketEntity(dto: TicketDTO): Ticket {
    const ticket: Ticket = new Ticket();
    ticket.price = dto.getPrice();
    ticket.serviceType = new ServiceType();
    ticket.serviceType.id = dto.getServiceType().getId();
    ticket.user = new User();
    ticket.user.id = dto.getUser().getId();
    ticket.trip = new Trip();
    ticket.trip.id = dto.getTrip().getId();
    ticket.seats = dto.getSeats().map((dto: CreateSeatDTO) => {
      const seat: Seat = new Seat();
      seat.id = dto.getId();
      if ('booked' in dto && dto.getBooked() != undefined) seat.booked = dto.getBooked();
      return seat;
    });
    return ticket;
  }
}
