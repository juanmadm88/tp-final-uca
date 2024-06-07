import { Injectable } from '@nestjs/common';
import { IMapper } from '../../constants/common';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandMapper implements IMapper {
  public transform(data: any): Brand {
    const response: Brand = new Brand();
    if (data.getDescription()) response.description = data.getDescription();
    return response;
  }
}
