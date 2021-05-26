import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "hooks";
import moment from "moment";

interface Props {}

export const ManageBooking = (props: Props) => {
  const [reference, setReference] = useState("");
  // const [lastName, setLastName] = useState("");

  const { loadingBookings, bookings } = useStoreState((state) => state.booking);

  const { retrieveBooking, getBookings, cancelBooking } = useStoreActions(
    (action) => action.booking
  );

  const retrieveBook = () => {
    const data = {
      ref: reference,
      // lastName,
    };
    retrieveBooking(data as any);
  };

  useEffect(() => {
    getBookings();
  }, []);

  // console.log(bookings, "alkjd");

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="search-tabs search-tabs-bg mt-5">
          <h1>Manage your bookings</h1>
          <div className="card p-5">
            <p>
              Manage your FlighHigh Airlines Booking Service by providing the
              Six-Digit alphabet Code on your Booking Confirmation and Retrieve
              your Booking.
            </p>
            <form className="form-inline">
              <div className="row">
                <div className="col" style={{ padding: "0 15px" }}>
                  <div className="input-group mb-2">
                    {/* <label className="sr-only" for="inlineFormInput">Ticket Number OR Booking Reference*</label> */}
                    <div className="input-group-prepend">
                      <div className="input-group-text custom-group">#</div>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ticket Number OR Booking Reference*"
                      onChange={(e: any) => {
                        setReference(e.target.value);
                        console.log(e.target.type);
                      }}
                    />
                  </div>
                </div>
                {/* <div className="col" style={{ padding: "0 15px" }}>
            <label className="sr-only">Last Name</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter your last name"
              onChange={(e: any) => setLastName(e.target.value)}
            />
          </div> */}
                <div className="col" style={{ padding: "0 15px" }}>
                  <button
                    onClick={retrieveBook}
                    type="submit"
                    className="btn btn-primary mb-2"
                    disabled={loadingBookings}
                  >
                    {loadingBookings ? (
                      <i className="fa fa-spinner loader"></i>
                    ) : null}
                    Retrieve booking
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-5">
              <h5 className="mt-3 mb-4" style={{ textDecoration: "underline" }}>
                List of bookings{" "}
                <span style={{ fontSize: "14px", color: "gray" }}>
                  ({bookings ? bookings.length : 0} items)
                </span>
              </h5>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">Booking reference</th>
                    <th scope="col">Flight Number</th>
                    <th scope="col">Departure Airport</th>
                    <th scope="col">Arrival Airport</th>
                    <th scope="col">Airline</th>
                    <th scope="col">Departure Date</th>
                    <th scope="col">Arrival Date</th>
                    <th scope="col">Passengers</th>
                    <th scope="col">Classe</th>
                    <th scope="col">Price</th>
                    <th scope="col">action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings && bookings.length > 0
                    ? bookings.map((bk: any) => (
                        <tr key={bk._id}>
                          <th style={{ color: "#e74c3c" }}>
                            {bk.bookingReference ? bk.bookingReference : "-"}
                          </th>
                          <td>
                            {bk.flight?.flight?.number
                              ? bk.flight?.flight?.number
                              : "-"}
                          </td>
                          <td>
                            {bk.flight?.departure?.airport
                              ? bk.flight?.departure?.airport
                              : "-"}
                          </td>
                          <td>
                            {bk.flight?.arrival?.airport
                              ? bk.flight?.arrival?.airport
                              : "-"}
                          </td>
                          <td>
                            {bk.flight?.airline?.name
                              ? bk.flight?.airline?.name
                              : "-"}
                          </td>
                          <td>
                            {bk.departureDate
                              ? moment(bk.departureDate).format("YYYY-MM-DD")
                              : "-"}
                          </td>
                          <td>
                            {bk.arrivalDate
                              ? moment(bk.arrivalDate).format("YYYY-MM-DD")
                              : "-"}
                          </td>
                          <td>
                            {bk.passengers && bk.passengers !== null
                              ? bk.passengers
                              : null}{" "}
                            {bk.isAdult !== null && bk.passengers !== null
                              ? bk.isAdult
                                ? "Adults"
                                : "children"
                              : " - "}
                          </td>
                          <td>{bk.class ? bk.class : "-"}</td>
                          <td style={{ color: "#e74c3c" }}>
                            ${bk.flight?.price ? bk.flight?.price : "-"}
                          </td>
                          <td>
                            <button
                              onClick={() => cancelBooking(bk._id)}
                              className="btn btn-primary btn-sm ml-4 mr-3"
                              disabled={loadingBookings}
                              key={bk._id}
                            >
                              {loadingBookings ? (
                                <i className="fa fa-spinner loader"></i>
                              ) : null}
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ))
                    : "no booking"}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
