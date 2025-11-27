import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TicketMapper } from './mapper/ticket.mapper';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  providers: [TicketService, TicketMapper],
  controllers: [TicketController]
})
export class TicketModule {}
