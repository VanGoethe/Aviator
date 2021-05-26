import { thunk, action } from "easy-peasy";
import { client } from "config";
import { Booking } from "state/types";

export const BookingModel: Booking = {
  loadingCities: false,
  cities: [],
  errors: {},

  loadingFlights: false,
  flights: {},

  loadingBooking: false,
  booked: {},

  loadingBookings: false,
  bookings: [],

  request: action((state, payload: any) => {
    console.log(payload);
    if (payload.type === "cities") {
      return (state.loadingCities = payload.status);
    }
    if (payload.type === "flights") {
      return (state.loadingFlights = payload.status);
    }
    if (payload.type === "booking") {
      return (state.loadingBooking = payload.status);
    }
    if (payload.type === "books") {
      return (state.loadingBookings = payload.status);
    }
  }),

  success: action((state, payload: any) => {
    if (payload.field === "cities") {
      return (state.cities = payload.value);
    }
    if (payload.field === "flights") {
      return (state.flights = payload.value);
    }
    if (payload.field === "booking") {
      return (state.booked = payload.value);
    }
    if (payload.field === "books") {
      return (state.bookings = payload.value);
    }
  }),

  clearBook: action((state) => (state.booked = {} as any)),

  failure: action((state, payload: any) => (state.errors = payload)),

  getCities: thunk(async (actions, payload: string) => {
    actions.request({ type: "cities", status: false } as any);
    actions.request({ type: "cities", status: true } as any);
    try {
      const response = await client().get(`/cities/${payload}`);
      if (response?.data) {
        actions.request({ type: "cities", status: false } as any);
        actions.success({ field: "cities", value: response.data } as any);
      }
    } catch (error) {
      actions.request({ type: "cities", status: false } as any);
      actions.failure(error.response ? error.response.data : null);
      console.log(error.response.data);
    }
  }),

  searchFlights: thunk(async (actions, payload: any) => {
    actions.request({ type: "flights", status: false } as any);
    actions.request({ type: "flights", status: true } as any);
    try {
      const response = await client().get(
        `/flightsPrice/${payload.dep_iata}/${payload.arr_iata}`
      );
      if (response.data) {
        actions.request({ type: "flights", status: false } as any);
        actions.success({ field: "flights", value: response.data } as any);
      }
    } catch (error) {
      actions.request({ type: "flights", status: false } as any);
      actions.failure(error.response ? error.response.data : null);
      console.log(error.response.data);
    }
  }),

  Book: thunk(async (actions, payload: any) => {
    actions.request({ type: "books", status: false } as any);
    actions.request({ type: "booking", status: true } as any);
    try {
      const response = await client().post(`/booking/`, payload);
      if (response.data) {
        // console.log(response.data );
        actions.request({ type: "booking", status: false } as any);
        actions.success({ field: "booking", value: response.data } as any);
      }
    } catch (error) {
      actions.request({ type: "booking", status: false } as any);
      actions.failure(error.response ? error.response.data : null);
      console.log(error.response.data);
    }
  }),

  retrieveBooking: thunk(async (actions, payload: any) => {
    actions.request({ type: "books", status: false } as any);
    actions.request({ type: "books", status: true } as any);
    try {
      // const response = await client().get(
      //   `/booking/${payload.ref}/${payload.lastName}`
      // );
      const response = await client().get(`/booking/${payload.ref}`);
      if (response.data) {
        actions.request({ type: "books", status: false } as any);
        actions.success({ field: "books", value: response.data } as any);
      }
    } catch (error) {
      actions.request({ type: "books", status: false } as any);
      actions.failure(error.response ? error.response.data : null);
      console.log(error.response.data);
    }
  }),
  getBookings: thunk(async (actions) => {
    actions.request({ type: "books", status: false } as any);
    actions.request({ type: "books", status: true } as any);
    try {
      const response = await client().get(`/bookingUser`);
      if (response.data) {
        actions.request({ type: "books", status: false } as any);
        actions.success({ field: "books", value: response.data } as any);
      }
    } catch (error) {
      actions.request({ type: "books", status: false } as any);
      actions.failure(error.response ? error.response.data : null);
      console.log(error.response.data);
    }
  }),

  cancelBooking: thunk(async (actions, payload: string) => {
    actions.request({ type: "books", status: false } as any);
    actions.request({ type: "books", status: true } as any);
    try {
      const response = await client().delete(`/booking/${payload}`);
      if (response.data) {
        await actions.getBookings();
        actions.request({ type: "books", status: false } as any);
      }
    } catch (error) {
      actions.request({ type: "books", status: false } as any);
      actions.failure(error.response ? error.response.data : null);
      console.log(error.response.data);
    }
  }),
  checkinBooking: thunk(async (actions, payload: string) => {
    actions.request({ type: "books", status: false } as any);
    actions.request({ type: "books", status: true } as any);
    try {
      const response = await client().put(`/booking/${payload}`);
      if (response.data) {
        await actions.getBookings();
        actions.request({ type: "books", status: false } as any);
      }
    } catch (error) {
      actions.request({ type: "books", status: false } as any);
      actions.failure(error.response ? error.response.data : null);
      console.log(error.response.data);
    }
  }),
};
