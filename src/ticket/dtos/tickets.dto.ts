import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { TicketDTO } from './ticket.dto';

/* istanbul ignore file */

export class TicketsDTO {
  constructor(args: any) {
    if (args) {
      const { tickets } = args;
      if (tickets) this.tickets = tickets;
    }
  }

  @ApiProperty({
    name: 'tickets',
    type: Array<TicketDTO>,
    required: true,
    description: 'The tickets to be created '
  })
  @IsNotEmpty()
  @IsArray()
  @Expose()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TicketDTO)
  private tickets: Array<TicketDTO>;

  public getTickets(): Array<TicketDTO> {
    return this.tickets;
  }
  public setTickets(value: Array<TicketDTO>) {
    this.tickets = value;
  }
}
