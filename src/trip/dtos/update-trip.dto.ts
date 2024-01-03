import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsOptional, IsNotEmptyObject, ValidateNested, IsBoolean } from 'class-validator';
import { UpdateAutobusDTO } from './update-autobus.dto';
/* istanbul ignore file */
export class UpdateTripDTO {
  constructor(args: any) {
    if (args) {
      const { autobus, finished } = args;
      if (autobus) this.autobus = autobus;
      if (finished) this.finished = finished;
    }
  }

  @ApiProperty({
    name: 'autobus',
    type: UpdateAutobusDTO,
    required: true,
    description: 'The Autobus asigned to the trip '
  })
  @IsNotEmptyObject()
  @ValidateNested()
  @Expose()
  @Type(() => UpdateAutobusDTO)
  private autobus: UpdateAutobusDTO;

  @ApiProperty({
    name: 'finished',
    type: 'boolean',
    required: true,
    description: 'Indicates whether the Trip is finished or not ',
    default: false
  })
  @Expose()
  @IsOptional()
  @IsBoolean()
  private finished: boolean;

  public getAutobus(): UpdateAutobusDTO {
    return this.autobus;
  }
  public setAutobus(value: UpdateAutobusDTO) {
    this.autobus = value;
  }
  public getFinished(): boolean {
    return this.finished;
  }
  public setFinished(value: boolean) {
    this.finished = value;
  }
}
