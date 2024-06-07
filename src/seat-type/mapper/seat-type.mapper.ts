import { Injectable } from '@nestjs/common';
import { IMapper } from '../../constants/common';
import { SeatType } from '../entities/seat-type.entity';

@Injectable()
export class SeatTypeMapper implements IMapper {
  public transform(data: any): SeatType {
    const response: SeatType = new SeatType();
    if (data.getDescription()) response.description = data.getDescription();
    if ('isActive' in data && data.getIsActive() != undefined) response.isActive = data.getIsActive();
    return response;
  }
}
