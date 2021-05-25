import { BookingModel } from "state/models/booking.model";
import { AuthModel } from "state/models/auth.model";

export interface Store {
  auth: typeof AuthModel;
  booking: typeof BookingModel;
}
