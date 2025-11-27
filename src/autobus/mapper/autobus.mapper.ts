import { Injectable } from '@nestjs/common';
import { IMapper } from '../../constants/common';
import { Autobus } from '../../autobus/entities/autobus.entity';
import { Model } from '../../model/entities/model.entity';
import { Brand } from '../../brand/entities/brand.entity';
import { Seat } from '../entities/seat.entity';
import { SeatType } from '../../seat-type/entities/seat-type.entity';
import { SeatDTO } from '../dtos/seat.dto';
import { SeatTypeDTO } from '../dtos/seat-type.dto';

@Injectable()
export class AutobusMapper implements IMapper {
  public transform(data: any): Autobus {
    const autobus: Autobus = new Autobus();
    const model: Model = new Model();
    const brand: Brand = new Brand();
    if (data.getId()) autobus.id = data.getId();
    if ('asigned' in data && data.getAsigned() != undefined) autobus.asigned = data.getAsigned();

    if (data.getModel()) {
      model.id = data.getModel().getId();
      model.description = data.getModel().getDescription();
      autobus.model = model;
    }
    if (data.getBrand()) {
      brand.id = data.getBrand().getId();
      brand.description = data.getBrand().getDescription();
      autobus.brand = brand;
    }
    if (data.getSeats()) {
      const seatArray: Array<Seat> = data.getSeats().map((seatDTO: SeatDTO) => {
        const seat: Seat = new Seat();
        seat.row = seatDTO.getRow();
        seat.column = seatDTO.getColumn();
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
}
