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
    if (request.path !== '/api/v1/transport/ticket/bulk') return next.handle();
    const duplicates: Array<number> = this.validateDuplicatedSeat(body?.getTickets());
    if (duplicates?.length) {
      const errorMessage: string = this.buildErrorMessage(body.getTickets(), duplicates);
      throw new BadRequestException(errorMessage);
    }
    return next.handle();
  }
  private validateDuplicatedSeat(tickets: Array<TicketDTO> = []): Array<number> {
    const seatIds: Array<number> = tickets.map((ticket: TicketDTO) => {
      return ticket?.getSeat()?.getId();
    });
    const duplicates: Array<any> = seatIds.filter((item, index) => seatIds.indexOf(item) !== index);
    return duplicates;
  }
  private buildErrorMessage(tickets: Array<TicketDTO>, duplicates: Array<number>): string {
    const tripIds: Array<any> = tickets.map((ticket: TicketDTO) => {
      if (duplicates.includes(ticket.getSeat().getId())) return ticket.getTrip().getId();
    });
    return `Trips ${tripIds} have booked the same seat`;
  }
}
