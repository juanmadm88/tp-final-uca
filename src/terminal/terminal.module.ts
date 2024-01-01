import { Global, Module } from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Terminal } from './entities/terminal.entity';
import { TerminalController } from './terminal.controller';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Terminal])],
  providers: [TerminalService],
  controllers: [TerminalController]
})
export class TerminalModule {}
