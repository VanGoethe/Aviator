import { thunk, action } from "easy-peasy";
import { client } from "config";
import { Booking } from "state/types";

export const BookingModel: Booking = {
  loadingCities: false,
  cities: [],
  errors: {},

  loadingFlights: false,
  flights: [],

  request: action((state, payload: any) => {
    console.log(payload);
    if (payload.type === "cities") {
      return (state.loadingCities = payload.status);
    }
    if (payload.type === "flights") {
      return (state.loadingFlights = payload.status);
    }
  }),

  success: action((state, payload: any) => {
    if (payload.field === "cities") {
      return (state.cities = payload.value);
    }
    if (payload.field === "flights") {
      return (state.flights = payload.value);
    }
  }),

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
    actions.request({ type: "flights", status: true } as any);
    try {
      const response = await client().get(
        `/flightsPrice/${payload.dep_iata}/${payload.arr_iata}`
      );
      if (response.data) {
        // console.log(response.data );
        actions.request({ type: "flights", status: false } as any);
        actions.success({ field: "flights", value: response.data } as any);
      }
    } catch (error) {
      actions.request({ type: "flights", status: false } as any);
      actions.failure(error.response ? error.response.data : null);
      console.log(error.response.data);
    }
  }),
};
