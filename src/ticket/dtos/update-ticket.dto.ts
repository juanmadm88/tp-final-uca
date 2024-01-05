/* istanbul ignore file */

import { IsBoolean, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTicketDTO {
  constructor(args: any) {
    if (args) {
      const { cancelled } = args;
      if (cancelled) this.cancelled = cancelled;
    }
  }
  @ApiProperty({
    name: 'seats',
    type: 'boolean',
    required: false,
    description: 'Indicates whether the ticket is cancelled or not '
  })
  @IsOptional()
  @Expose()
  @IsBoolean()
  private cancelled?: boolean;

  public getCancelled(): boolean {
    return this.cancelled;
  }
  public setCancelled(value: boolean) {
    return (this.cancelled = value);
  }
}
