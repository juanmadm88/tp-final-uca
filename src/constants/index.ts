export class Constants {
  public static readonly USER_ALREADY_EXISTS: string = 'User already exists';
  public static readonly WRONG_PASSWORD_USERNAME: string = 'Wrong password or username';
  public static readonly TRIP_NOT_ALLOWED_TO_UPDATE: string = 'The trip is not finished yet, so can´t be updated';
  public static readonly AUTOBUS_ALREADY_ASIGNED: string = 'Autobus is asigned to another trip';
  public static readonly WHERE_CLAUSES: any = {
    trip: {
      originDescription: 'origin.description like :originDescription',
      destinationDescription: ' destination.description like :destinationDescription',
      departureDate: 'trip.departureDate like :departureDate'
    }
  };
}
