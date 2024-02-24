import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { TicketsDTO } from '../dtos/tickets.dto';
import { UtilsService } from '../../utils/utils.service';
import { TicketDTO } from '../dtos/ticket.dto';
@Injectable()
export class VerifyDuplicatedSeatInterceptor implements NestInterceptor {
  constructor(private utilsService: UtilsService) {}
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const body: TicketsDTO = this.utilsService.buildDTO(request.body, TicketsDTO);
    if (request.method !== 'POST' && request.path !== '/api/v1/transport/ticket/bulk') return next.handle();
    const duplicates: Array<number> = this.validateDuplicatedSeat(body?.getTickets());
    if (duplicates?.length) throw new BadRequestException('Can´t book more than once the same seat ');
    return next.handle();
  }
  private validateDuplicatedSeat(tickets: Array<TicketDTO> = []): Array<number> {
    const seatIds: Array<number> = tickets.map((ticket: TicketDTO) => {
      return ticket?.getSeat()?.getId();
    });
    const duplicates: Array<any> = seatIds.filter((item, index) => seatIds.indexOf(item) !== index);
    return duplicates;
  }
}
