import { Model } from '../model/entities/model.entity';

export interface QueryParams {
  skip?: number;
  size?: number;
  description?: string;
}
export interface QueryParamsTicket extends QueryParams {
  username?: string;
  serviceTypeDescription?: string;
  tripOriginDescription?: string;
  tripDestinationDescription?: string;
  tripArrivalDate?: string;
  tripDepartureDate?: string;
  cancelled?: string;
}
export interface QueryParamsTrip extends QueryParams {
  destinationDescription?: string;
  originDescription?: string;
  departureDate?: string;
}

export interface TripParameters {
  numberOfSeats: number;
  kilometers: number;
  autobusModel: Model;
}

export interface TicketResponse {
  totalCost: number;
}
