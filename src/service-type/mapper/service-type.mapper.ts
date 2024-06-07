import { Injectable } from '@nestjs/common';
import { IMapper } from '../../constants/common';
import { ServiceType } from '../entities/service-type.entity';

@Injectable()
export class ServiceTypeMapper implements IMapper {
  public transform(data: any): ServiceType {
    const response: ServiceType = new ServiceType();
    if (data.getDescription()) response.description = data.getDescription();
    if ('isActive' in data && data.getIsActive() != undefined) response.isActive = data.getIsActive();
    return response;
  }
}
