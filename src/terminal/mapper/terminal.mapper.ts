import { Injectable } from '@nestjs/common';
import { IMapper } from '../../constants/common';
import { Terminal } from '../entities/terminal.entity';

@Injectable()
export class TerminalMapper implements IMapper {
  public transform(data: any): Terminal {
    const response: Terminal = new Terminal();
    if (data.getDescription()) response.description = data.getDescription();
    if (data.getKilometer()) response.kilometer = data.getKilometer();
    return response;
  }
}
