import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { TripDTO } from './dtos/trip.dto';
import { DataSource, FindManyOptions } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { Autobus } from '../autobus/entities/autobus.entity';
import { UpdateTripDTO } from './dtos/update-trip.dto';
import { Constants } from '../constants';
import { AutoBusDTO } from '../autobus/dtos/autobus.dto';
import { Seat } from '../autobus/entities/seat.entity';
import { TripMapper } from './mapper/trip.mapper';

@Injectable()
export class TripService {
  constructor(private utils: UtilsService, private dataSource: DataSource, private mapper: TripMapper) {}
  async create(dto: TripDTO): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const id: number = dto.getAutobus().getId();
      const tripDB: Trip = await this.dataSource.getRepository(Trip).createQueryBuilder('trip').innerJoinAndSelect('trip.autobus', 'autobus').where('trip.autobus.id = :id', { id }).getOne();
      if (tripDB) throw new BadRequestException(Constants.AUTOBUS_ALREADY_ASIGNED);
      await queryRunner.manager.save(this.mapper.transform(dto));
      await queryRunner.manager.update(Autobus, id, { asigned: true });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async update(id: number, dto: UpdateTripDTO): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (!dto.getFinished()) throw new InternalServerErrorException(Constants.TRIP_NOT_ALLOWED_TO_UPDATE);
      const trip: Trip = this.mapper.transform(dto, true);
      await queryRunner.manager.update(Trip, id, trip);
      const autobusDBO: AutoBusDTO = this.utils.buildDTO(await queryRunner.manager.findOne(Autobus, { where: { id: dto.getAutobus().getId() }, relations: ['seats'] }), AutoBusDTO);
      for (const seat of autobusDBO.getSeats()) {
        if (seat.getBooked()) {
          await queryRunner.manager.update(Seat, seat.getId(), { booked: false });
        }
      }
      const idAutobus: number = dto.getAutobus().getId();
      await queryRunner.manager.update(Autobus, idAutobus, { asigned: false });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(options: FindManyOptions = {}): Promise<Array<TripDTO>> {
    const where: string = this.utils.buildQuery(options.where, 'trip');
    const trip = await this.dataSource
      .getRepository(Trip)
      .createQueryBuilder('trip')
      .innerJoinAndSelect('trip.autobus', 'autobus')
      .innerJoinAndSelect('trip.destination', 'destination')
      .innerJoinAndSelect('trip.origin', 'origin')
      .where(where, options.where)
      .skip(options.skip)
      .take(options.take)
      .getMany();
    return this.utils.buildDTO(trip, TripDTO);
  }

  async findById(id: number): Promise<TripDTO> {
    const queryRunner = this.dataSource.createQueryRunner();
    return this.utils.buildDTO(await queryRunner.manager.findOne(Trip, { where: { id }, relations: ['autobus.seats'] }), TripDTO);
  }
}
