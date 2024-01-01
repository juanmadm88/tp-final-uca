import { Injectable } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { AutoBusDTO } from './dtos/autobus.dto';
import { DataSource } from 'typeorm';
import { Autobus } from './entities/autobus.entity';
import { Model } from '../model/entities/model.entity';
import { Brand } from '../brand/entities/brand.entity';
import { Seat } from './entities/seat.entity';
import { SeatDTO } from './dtos/seat.dto';
import { SeatTypeDTO } from './dtos/seat-type.dto';
import { SeatType } from '../seat-type/entities/seat-type.entity';

@Injectable()
export class AutobusService {
  constructor(private utils: UtilsService, private dataSource: DataSource) {}
  async create(dto: AutoBusDTO): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(this.buildAutobusEntity(dto));
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  private buildAutobusEntity(dto: AutoBusDTO): Autobus {
    const autobus: Autobus = new Autobus();
    const model: Model = new Model();
    const brand: Brand = new Brand();
    if (dto.getId()) autobus.id = dto.getId();
    if ('asigned' in dto && dto.getAsigned() != undefined) autobus.asigned = dto.getAsigned();
    model.id = dto.getModel().getId();
    model.description = dto.getModel().getDescription();
    autobus.model = model;
    brand.id = dto.getBrand().getId();
    brand.description = dto.getBrand().getDescription();
    autobus.brand = brand;
    const seatArray: Array<Seat> = dto.getSeats().map((seatDTO: SeatDTO) => {
      const dto: SeatTypeDTO = seatDTO.getSeatType();
      const seatType: SeatType = new SeatType();
      seatType.id = dto.getId();
      seatType.description = dto.getDescription();
      if ('isActive' in dto && dto.getIsActive() != undefined) seatType.isActive = dto.getIsActive();
      const seat: Seat = new Seat();
      seat.seatType = seatType;
      if ('booked' in seatDTO && seatDTO.getBooked() != undefined) seatType.isActive = seatDTO.getBooked();
      return seat;
    });
    autobus.seats = seatArray;
    return autobus;
  }
}
