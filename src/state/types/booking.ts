import { Action, Thunk } from "easy-peasy";

export interface Booking {
  loadingCities: boolean;
  cities: any;
  errors: any;

  loadingFlights: boolean;
  flights: any;

  loadingBooking: boolean;
  booked: any;

  loadingBookings: boolean;
  bookings: [];

  request: Action<Booking>;
  success: Action<Booking>;
  failure: Action<Booking>;
  getCities: Thunk<Booking, string>;

  searchFlights: Thunk<Booking, any>;
  Book: Thunk<Booking, any>;
  clearBook: Action<Booking>;

  retrieveBooking: Thunk<Booking, any>;
  getBookings: Thunk<Booking>;
  cancelBooking: Thunk<Booking, string>;
  checkinBooking: Thunk<Booking, string>;
}
