import { Injectable } from '@nestjs/common';
import { IMapper } from '../../constants/common';
import { Trip } from '../entities/trip.entity';
import { Autobus } from '../../autobus/entities/autobus.entity';
import { Terminal } from '../../terminal/entities/terminal.entity';

@Injectable()
export class TripMapper implements IMapper {
  public transform(data: any, isUpdate: boolean): Trip {
    const trip: Trip = new Trip();
    if (!isUpdate) {
      if (data.getArrivalDate()) trip.arrivalDate = data.getArrivalDate();
      if (data.getDepartureDate()) trip.departureDate = data.getDepartureDate();
      if (data.getAutobus()) {
        trip.autobus = new Autobus();
        trip.autobus.id = data.getAutobus().getId();
      }
      if (data.getDestination()) {
        trip.destination = new Terminal();
        trip.destination.id = data.getDestination().getId();
      }
      if (data.getOrigin()) {
        trip.origin = new Terminal();
        trip.origin.id = data.getOrigin().getId();
      }
      return trip;
    }
    trip.finished = data.getFinished();
    trip.autobus = null;
    return trip;
  }
}
