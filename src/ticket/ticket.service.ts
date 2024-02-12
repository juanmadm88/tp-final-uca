import { BadRequestException, Injectable } from '@nestjs/common';
import { TicketDTO } from './dtos/ticket.dto';
import { DataSource, FindManyOptions } from 'typeorm';
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
import { UtilsService } from '../utils/utils.service';
import { UpdateSeatDTO } from '../autobus/dtos/update-seat.dto';
import { UpdateServiceTypeDTO } from '../service-type/dtos/update-service-type.dto';
import { TripParameters } from '../constants/common';

@Injectable()
export class TicketService {
  constructor(private dataSource: DataSource, private configService: ConfigService, private utils: UtilsService) {}
  //TODO: HACER QUE SE BANQUE PASAR UN ARRAY DE TICKETS, PARA QUE PUEDA COMPRAR MAS DE 1 PASAJE POR USUARIO
  async create(dto: TicketDTO): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const seat: CreateSeatDTO = dto.getSeat();
      const id: number = seat.getId();
      const seatDB: Seat = await this.dataSource.getRepository(Seat).createQueryBuilder('seat').where('seat.id = :id', { id }).innerJoinAndSelect('seat.seatType', 'seatType').getOne();
      const serviceTypeDB: ServiceType = await this.dataSource.getRepository(ServiceType).createQueryBuilder('type').where('type.id = :id', { id: dto.getServiceType().getId() }).getOne();
      const seatType: SeatType = seatDB.seatType;
      if (seatDB.booked) throw new BadRequestException(Constants.SEAT_ALREADY_BOOKED);
      await queryRunner.manager.getRepository(Seat).update(seatDB.id, { booked: true });
      const price: number = await this.calculateTotalPrice(dto, { serviceTypeDB, seatType });
      await queryRunner.manager.save(this.buildTicketEntity(dto, price));
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  private async calculateTotalPrice(dto: TicketDTO, parameters: any): Promise<number> {
    const { serviceTypeDB, seatType } = parameters;
    const { numberOfSeats, kilometers, autobusModel } = await this.getTripParameters(this.dataSource, dto.getTrip().getId());
    const price: number = this.buildPrice({ serviceType: serviceTypeDB, kilometers, seatType, autobusModel, numberOfSeats });
    return price;
  }
  private async getTripParameters(dataSource: DataSource, idTrip: number): Promise<TripParameters> {
    const trip: Trip = await dataSource
      .getRepository(Trip)
      .createQueryBuilder('trip')
      .innerJoinAndSelect('trip.destination', 'destination')
      .innerJoinAndSelect('trip.origin', 'origin')
      .innerJoinAndSelect('trip.autobus', 'autobus')
      .innerJoinAndSelect('autobus.model', 'model')
      .innerJoinAndSelect('autobus.seats', 'seats')
      .where('trip.id = :id', { id: idTrip })
      .getOne();
    return {
      numberOfSeats: trip.autobus.seats.length,
      kilometers: Math.abs(trip.destination.kilometer - trip.origin.kilometer),
      autobusModel: trip.autobus.model
    };
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
    const seatDto: CreateSeatDTO = dto.getSeat();
    ticket.seat = new Seat();
    ticket.seat.id = seatDto.getId();
    if ('booked' in seatDto && seatDto.getBooked() != undefined) ticket.seat.booked = seatDto.getBooked();
    return ticket;
  }
  private buildPrice(args: any): number {
    const { serviceType, kilometers, seatType, autobusModel, numberOfSeats } = args;
    const costs: any = this.configService.get<object>('appConfig.pricesConfig');
    const { fuelCostPerLt, seatTypeCost, fuelPerKm, serviceTypeCost } = costs;
    let seatCosts: any = 0;
    seatCosts += seatTypeCost[seatType.description];
    const price: number = (fuelCostPerLt * fuelPerKm[autobusModel.description.toLowerCase()] * kilometers) / numberOfSeats + serviceTypeCost[serviceType.description.toLowerCase()] + seatCosts;
    return price;
  }
  //TODO: PROBAR ESTO PORQUE MODIFIQUE LA FUNCION QUE CALCULA LOS COSTOS
  async update(idTicket: number, dto: UpdateTicketDTO): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const isCancelled: boolean = dto.getCancelled();
      if (isCancelled) {
        await queryRunner.manager.getRepository(Ticket).update(idTicket, { cancelled: isCancelled });
        const ticket: Ticket = await this.dataSource.getRepository(Ticket).createQueryBuilder('ticket').where('ticket.id = :id', { id: idTicket }).innerJoinAndSelect('ticket.seat', 'seat').getOne();
        const seat: Seat = ticket.seat;
        if (seat.booked) await queryRunner.manager.getRepository(Seat).update(seat.id, { booked: false });
        return await queryRunner.commitTransaction();
      }
      const seatDTO: UpdateSeatDTO = dto.getSeat();
      const serviceTypeDTO: UpdateServiceTypeDTO = dto.getServiceType();
      if (seatDTO || serviceTypeDTO) {
        let serviceTypeDB: ServiceType;
        let seatTypeDB: SeatType;
        const ticketDB: Ticket = await this.dataSource
          .getRepository(Ticket)
          .createQueryBuilder('ticket')
          .innerJoinAndSelect('ticket.seat', 'seat')
          .innerJoinAndSelect('ticket.serviceType', 'serviceType')
          .innerJoinAndSelect('seat.seatType', 'seatType')
          .innerJoinAndSelect('ticket.trip', 'trip')
          .where('ticket.id = :id', { id: idTicket })
          .getOne();
        const seatDB: Seat = await this.dataSource.getRepository(Seat).createQueryBuilder('seat').innerJoinAndSelect('seat.seatType', 'seatType').where('seat.id = :id', { id: seatDTO.getId() }).getOne();
        const updateTicketDb: Ticket = new Ticket();
        if (seatDTO && seatDTO.getId() != ticketDB.seat.id) {
          if (seatDB.booked) throw new BadRequestException(Constants.SEAT_ALREADY_BOOKED);
          seatTypeDB = seatDB.seatType;
          updateTicketDb.seat = new Seat();
          updateTicketDb.seat.id = seatDTO.getId();
          updateTicketDb.seat.booked = true;
          await queryRunner.manager.getRepository(Seat).update(ticketDB.seat.id, { booked: false });
        }
        if (serviceTypeDTO && serviceTypeDTO.getId() != ticketDB.serviceType.id) {
          serviceTypeDB = await this.dataSource.getRepository(ServiceType).createQueryBuilder('serviceType').where('serviceType.id = :id', { id: serviceTypeDTO.getId() }).getOne();
          updateTicketDb.serviceType = new ServiceType();
          updateTicketDb.serviceType.id = serviceTypeDTO.getId();
        }
        serviceTypeDB = serviceTypeDB || ticketDB.serviceType;
        seatTypeDB = seatTypeDB || ticketDB.seat.seatType;
        const ticketDTO: TicketDTO = this.utils.buildDTO({ trip: { id: ticketDB.trip.id } }, TicketDTO);
        const price: number = await this.calculateTotalPrice(ticketDTO, { serviceTypeDB, seatType: seatTypeDB });
        updateTicketDb.price = price;
        await queryRunner.manager.getRepository(Ticket).save({ id: idTicket, ...updateTicketDb });
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async findAll(options: FindManyOptions = {}): Promise<Array<TicketDTO>> {
    const where: string = this.utils.buildQuery(options.where, 'ticket');
    const tickets = await this.dataSource
      .getRepository(Ticket)
      .createQueryBuilder('ticket')
      .innerJoinAndSelect('ticket.user', 'user')
      .innerJoinAndSelect('ticket.serviceType', 'serviceType')
      .innerJoinAndSelect('ticket.trip', 'trip')
      .innerJoinAndSelect('trip.destination', 'tripDestination')
      .innerJoinAndSelect('trip.origin', 'tripOrigin')
      .innerJoinAndSelect('ticket.seat', 'seat')
      .where(where, options.where)
      .skip(options.skip)
      .take(options.take)
      .getMany();
    return this.utils.buildDTO(tickets, TicketDTO);
  }
}
