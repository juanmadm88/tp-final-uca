import { Injectable } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { AutoBusDTO } from './dtos/autobus.dto';
import { DataSource, FindManyOptions } from 'typeorm';
import { Autobus } from './entities/autobus.entity';
import { Model } from '../model/entities/model.entity';
import { Brand } from '../brand/entities/brand.entity';
import { Seat } from './entities/seat.entity';
import { SeatDTO } from './dtos/seat.dto';
import { SeatTypeDTO } from './dtos/seat-type.dto';
import { SeatType } from '../seat-type/entities/seat-type.entity';
import { UpdateAutoBusDTO } from './dtos/update-autobus.dto';

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
  private buildAutobusEntity(dto: any): Autobus {
    const autobus: Autobus = new Autobus();
    const model: Model = new Model();
    const brand: Brand = new Brand();
    if (dto.getId()) autobus.id = dto.getId();
    if ('asigned' in dto && dto.getAsigned() != undefined) autobus.asigned = dto.getAsigned();

    if (dto.getModel()) {
      model.id = dto.getModel().getId();
      model.description = dto.getModel().getDescription();
      autobus.model = model;
    }
    if (dto.getBrand()) {
      brand.id = dto.getBrand().getId();
      brand.description = dto.getBrand().getDescription();
      autobus.brand = brand;
    }
    if (dto.getSeats()) {
      const seatArray: Array<Seat> = dto.getSeats().map((seatDTO: SeatDTO) => {
        const seat: Seat = new Seat();
        if (seatDTO.getSeatType()) {
          const dto: SeatTypeDTO = seatDTO.getSeatType();
          const seatType: SeatType = new SeatType();
          seatType.id = dto.getId();
          seat.seatType = seatType;
        }
        if ('booked' in seatDTO && seatDTO.getBooked() != undefined) seat.booked = seatDTO.getBooked();
        return seat;
      });
      autobus.seats = seatArray;
    }
    return autobus;
  }
  async update(id: number, dto: UpdateAutoBusDTO): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(Autobus, id, { asigned: dto.getAsigned() });
      if (dto.getSeats()) {
        for (const seat of dto.getSeats()) {
          await queryRunner.manager.update(Seat, seat.getId(), { booked: seat.getBooked() });
        }
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async findAll(paginationOptions: FindManyOptions = {}): Promise<Array<AutoBusDTO>> {
    const pagination: any = {};
    if (paginationOptions.skip) pagination.skip = paginationOptions.skip;
    if (paginationOptions.take) pagination.take = paginationOptions.take;
    const queryRunner = this.dataSource.createQueryRunner();
    return this.utils.buildDTO(await queryRunner.manager.find(Autobus, { ...pagination }), AutoBusDTO);
  }

  async findById(id: number): Promise<AutoBusDTO> {
    const queryRunner = this.dataSource.createQueryRunner();
    return this.utils.buildDTO(await queryRunner.manager.findOne(Autobus, { where: { id }, relations: ['seats'] }), AutoBusDTO);
  }
}
