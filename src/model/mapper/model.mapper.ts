import { Injectable } from '@nestjs/common';
import { IMapper } from '../../constants/common';
import { Model } from '../entities/model.entity';

@Injectable()
export class ModelMapper implements IMapper {
  public transform(data: any): Model {
    const response: Model = new Model();
    if (data.getDescription()) response.description = data.getDescription();
    return response;
  }
}
