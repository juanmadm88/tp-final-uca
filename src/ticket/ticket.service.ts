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
import { SeatType } from '../seat-type/entities/seat-type.entity';
import { ConfigService } from '@nestjs/config';
import { UpdateTicketDTO } from './dtos/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(private utils: UtilsService, private dataSource: DataSource, private configService: ConfigService) {}
  async create(dto: TicketDTO): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const seatTypes: Array<SeatType> = [];
      const seats: Array<CreateSeatDTO> = dto.getSeats();
      const ids: Array<number> = seats.map((seat: CreateSeatDTO) => {
        return seat.getId();
      });
      const seatsDB: Array<Seat> = await this.dataSource.getRepository(Seat).createQueryBuilder('seat').where('seat.id IN (:...ids)', { ids }).innerJoinAndSelect('seat.seatType', 'seatType').getMany();
      const serviceTypeDB: ServiceType = await this.dataSource.getRepository(ServiceType).createQueryBuilder('type').where('type.id = :id', { id: dto.getServiceType().getId() }).getOne();
      for (const seat of seatsDB) {
        seatTypes.push(seat.seatType);
        if (seat.booked) throw new BadRequestException(Constants.SEAT_ALREADY_BOOKED);
        await queryRunner.manager.getRepository(Seat).update(seat.id, { booked: true });
      }
      const trip: Trip = await this.dataSource.getRepository(Trip).createQueryBuilder('trip').innerJoinAndSelect('trip.destination', 'destination').innerJoinAndSelect('trip.origin', 'origin').where('trip.id = :id', { id: dto.getTrip().getId() }).getOne();
      const kilometers: number = trip.destination.kilometer - trip.origin.kilometer;
      await queryRunner.manager.save(this.buildTicketEntity(dto, this.buildPrice({ serviceType: serviceTypeDB, kilometers, seatTypes })));
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  private buildTicketEntity(dto: TicketDTO, price: number): Ticket {
    const ticket: Ticket = new Ticket();
    ticket.price = price;
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
  private buildPrice(args: any): number {
    const { serviceType, kilometers, seatTypes } = args;
    const costs: any = this.configService.get<object>('appConfig.pricesConfig');
    const { fuelCostPerKm, seatTypeCost, serviceTypeCost } = costs;
    let seatCosts: any = 0;
    seatTypes.forEach((element: any) => {
      seatCosts += seatTypeCost[element.description];
    });
    const price: number = fuelCostPerKm * kilometers + serviceTypeCost[serviceType.description.toLowerCase()] + seatCosts;
    return price;
  }

  async update(id: number, dto: UpdateTicketDTO): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const isCancelled: boolean = dto.getCancelled();
      if (isCancelled) {
        await queryRunner.manager.getRepository(Ticket).update(id, { cancelled: isCancelled });
        const ticket: Ticket = await this.dataSource.getRepository(Ticket).createQueryBuilder('ticket').where('ticket.id = :id', { id }).innerJoinAndSelect('ticket.seats', 'seats').getOne();
        const seats: Array<Seat> = ticket.seats;
        for (const seat of seats) {
          if (seat.booked) await queryRunner.manager.getRepository(Seat).update(seat.id, { booked: false });
        }
        await queryRunner.commitTransaction();
        return;
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
