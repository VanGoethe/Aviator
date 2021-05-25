import { Action, Thunk } from "easy-peasy";

export interface Booking {
  loadingCities: boolean;
  cities: any;
  errors: any;

  loadingFlights: boolean;
  flights: any;

  request: Action<Booking>;
  success: Action<Booking>;
  failure: Action<Booking>;
  getCities: Thunk<Booking, string>;

  searchFlights: Thunk<Booking, any>;
}
