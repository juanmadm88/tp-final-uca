import { Injectable } from '@nestjs/common';
import { DataSource, FindManyOptions } from 'typeorm';
import { Ticket } from '../ticket/entities/ticket.entity';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class ReportService {
  constructor(private dataSource: DataSource, private utils: UtilsService) {}
  async getKmTravelled(options: FindManyOptions = {}): Promise<Array<any>> {
    const whereString: string = this.utils.buildQuery(options.where, 'kmTravelled');
    const queryBuilder = this.dataSource.createQueryBuilder();
    return await queryBuilder
      .select(['row.idAutobus AS "Id Autobus" ', 'row.autobusModel AS "Modelo Micro"', 'SUM(row.kilometersTravelled) AS "Kilometros Recorridos"'])
      .from((subQuery) => {
        return subQuery
          .select(['trip.id AS idTrip', ' model.description AS autobusModel', 'ABS(destination.kilometer - origin.kilometer) AS kilometersTravelled', 'autobus.id AS idAutobus', 'autobus.asigned AS autobusIsAsigned', 'ticket.cancelled AS ticketCancelled'])
          .from(Ticket, 'ticket')
          .innerJoinAndSelect('ticket.trip', 'trip')
          .innerJoinAndSelect('trip.destination', 'destination')
          .innerJoinAndSelect('trip.origin', 'origin')
          .innerJoinAndSelect('ticket.seats', 'seat')
          .innerJoinAndSelect('seat.autobus', 'autobus')
          .innerJoinAndSelect('autobus.model', 'model')
          .distinct(true);
      }, 'row')
      .groupBy('row.idAutobus')
      .skip(options.skip)
      .take(options.take)
      .where(whereString, options.where)
      .getRawMany();
  }
  async getTicketSold(options: FindManyOptions = {}): Promise<any> {
    const whereString: string = this.utils.buildQuery(options.where, 'ticketSold');
    const queryBuilder = this.dataSource.createQueryBuilder();
    return await queryBuilder.select('COUNT(DISTINCT ticket.id) AS "Tickets Vendidos "').from(Ticket, 'ticket').innerJoin('ticket.trip', 'trip').where(whereString, options.where).getRawMany();
  }
  async getBilling(options: FindManyOptions = {}): Promise<any> {
    const whereString: string = this.utils.buildQuery(options.where, 'ticketSold');
    const queryBuilder = this.dataSource.createQueryBuilder();
    return await queryBuilder.select('SUM(ticket.price) AS "Facturacion "').from(Ticket, 'ticket').innerJoin('ticket.trip', 'trip').where(whereString, options.where).getRawMany();
  }
}
