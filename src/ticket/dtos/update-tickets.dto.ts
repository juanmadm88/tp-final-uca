import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { UpdateTicketDTO } from './update-ticket.dto';

/* istanbul ignore file */

export class UpdateTicketsDTO {
  constructor(args: any) {
    if (args) {
      const { tickets } = args;
      if (tickets) this.tickets = tickets;
    }
  }

  @ApiProperty({
    name: 'tickets',
    type: Array<UpdateTicketDTO>,
    required: true,
    description: 'The tickets to be updated '
  })
  @IsNotEmpty()
  @IsArray()
  @Expose()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateTicketDTO)
  private tickets: Array<UpdateTicketDTO>;

  public getTickets(): Array<UpdateTicketDTO> {
    return this.tickets;
  }
  public setTickets(value: Array<UpdateTicketDTO>) {
    this.tickets = value;
  }
}
