import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { DepartureAutoComplete } from "./components";
import { ArrivalAutoComplete } from "./components/ArrivalAutocomplete";
import { useStoreActions, useStoreState } from "hooks";
import moment from "moment";

interface Props {}

export const Booking = (props: Props) => {
  const { searchFlights, Book, clearBook } = useStoreActions(
    (action) => action.booking
  );
  const { loadingFlights, flights, loadingBooking, booked } = useStoreState(
    (state) => state.booking
  );

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [passenger, setPassenger] = useState((null as unknown) as any);
  const [Adult, setAdult] = useState("");
  const [classe, setClasse] = useState("");

  const [flightList, setflightList] = useState({} as any);
  const [hasBooked, setHasBooked] = useState({} as any);

  const onBook = (flight: any) => {
    const data = {
      flight,
      departureDate: startDate,
      arrivalDate: endDate,
      passengers: passenger,
      isAdult: Adult === "1" ? true : false,
      class: classe,
    };
    console.log(data, "datastosend");
    Book(data as any);
  };

  const onSearch = () => {
    const data = {
      dep_iata: departure,
      arr_iata: arrival,
    };
    setHasBooked({});
    setflightList({});
    searchFlights(data as any);
  };

  useEffect(() => {
    if (booked && Object.keys(booked).length > 0) {
      setHasBooked(booked);
    }
  }, [booked]);

  useEffect(() => {
    if (flights && Object.keys(flights).length > 0) {
      setflightList(flights);
    }
  }, [loadingFlights, flights]);

  const clear = () => {
    setDeparture("");
    setArrival("");
    setClasse("");
    setPassenger("");
    setAdult("");
    setStartDate("" as any);
    setEndDate("" as any);

    setHasBooked({} as any);
    setflightList({} as any);
    clearBook();
  };

  return (
    <div>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <span className="nav-link active" aria-current="page">
            One way
          </span>
        </li>
        <li
          className="nav-item"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <span className="nav-link disabled" style={{ paddingRight: "5px" }}>
            Two way{" "}
          </span>
          <span
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Comming soon ..."
          >
            <i className="fa fa-info-circle"></i>
          </span>
        </li>
      </ul>
      <div className="row pt-4">
        <div className="col col-12 col-sm-12 col-md-12 col-lg-4">
          <DepartureAutoComplete
            depValue={departure}
            setDepartureIata={(val: string) => setDeparture(val)}
          />
        </div>
        <div className="col col-12 col-sm-12 col-md-12 col-lg-4">
          <ArrivalAutoComplete
            arValue={arrival}
            setArrivalIata={(val: string) => setArrival(val)}
          />
        </div>
        <div className="col col-12 col-sm-12 col-md-12 col-lg-4">
          <div className="row">
            <div className="col-6">
              <label className="form-label">Departure date</label>
              <DatePicker
                selected={startDate}
                onChange={(date: any) => setStartDate(date)}
                wrapperClassName="date-picker"
              />
            </div>
            <div className="col-6">
              <label className="form-label">Return date</label>
              <DatePicker
                selected={endDate}
                onChange={(date: any) => setEndDate(date)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row pt-4">
        <div className="col col-lg-4 col-md-6 col-12 col-sm-12 ">
          <label className="form-label">passengers</label>
          <div className="input-group mb-3">
            <input
              type="number"
              min="0"
              className="form-control"
              onChange={(el: any) => setPassenger(el.target.value)}
            />
            <select
              onChange={(e: any) => setAdult(e.target.value)}
              className="form-select"
            >
              <option selected value="1">
                Adults (12+ years)
              </option>
              <option value="2">Children (11- years)</option>
            </select>
          </div>
        </div>
        <div className="col col-lg-4 col-md-6 col-12 col-sm-12 ">
          <label className="form-label">Classes</label>
          <select
            onChange={(e: any) => setClasse(e.target.value)}
            className="form-select"
          >
            <option selected>All classes</option>
            <option value="business">Business class</option>
            <option value="economic">Economic class</option>
          </select>
        </div>
        <div className="col col-lg-4 col-md-6 col-12 col-sm-12 ">
          <label className="form-label">
            Promo code
            <span
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Promotional code is a series of letters/numbers that allow you to get a discount on flights."
            >
              <i className="fa fa-info-circle"></i>
            </span>
          </label>
          <input type="text" className="form-control" />
        </div>
      </div>
      <div className="row pt-4">
        <button
          onClick={onSearch}
          type="button"
          className="btn btn-dark"
          disabled={loadingFlights}
        >
          Search flight
        </button>
      </div>

      {loadingFlights ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>loading...</span>
        </div>
      ) : flights &&
        Object.keys(flightList).length > 0 &&
        Object.keys(hasBooked).length <= 0 ? (
        <div className="table-component mt-5">
          <div className="card text-center">
            <div className="card-header">Available flights</div>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5
                    className="card-title"
                    style={{ display: "grid", justifyContent: "center" }}
                  >
                    <div
                      style={{
                        padding: "3px 5px",
                        background: "lightgrey",
                        borderRadius: "50px",
                        marginBottom: "15px",
                      }}
                    >
                      Departure
                    </div>
                    <div>
                      <i
                        style={{ color: "#727272" }}
                        className="fas fa-fighter-jet"
                      ></i>
                    </div>
                    <div>{flightList?.departure?.airport}</div>
                  </h5>
                  <div
                    style={{ color: "rgb(30, 30, 30)", fontSize: "14px" }}
                    className="card-text"
                  >
                    <div>IATA: {flightList?.departure?.iata}</div>
                    <br />
                    <div>Time zone: {flightList?.departure?.timezone}</div>
                    <div>
                      Scheduled:{" "}
                      {moment(flightList?.departure?.scheduled).format(
                        "YYYY-MM-DD"
                      )}
                    </div>
                    <div>
                      Estimated:{" "}
                      {moment(flightList?.departure?.estimated).format(
                        "YYYY-MM-DD"
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="col"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "rgb(30, 30, 30)",
                        }}
                      >
                        Flight:{" "}
                        <span
                          style={{
                            fontSize: "18px !important",
                            color: "rgb(0,0,0)",
                            fontWeight: 700,
                          }}
                        >
                          {flightList?.flight?.number}
                        </span>
                      </div>
                      <div>
                        <i
                          className="fas fa-arrow-circle-right"
                          style={{ fontSize: "30px", color: "grey" }}
                        ></i>
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "rgb(30, 30, 30)",
                        }}
                      >
                        Airline:
                        <span
                          style={{
                            fontSize: "18px !important",
                            color: "rgb(0,0,0)",
                            fontWeight: 700,
                          }}
                        >
                          {flightList?.airline?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <h5
                    className="card-title"
                    style={{ display: "grid", justifyContent: "center" }}
                  >
                    <div
                      style={{
                        padding: "3px 5px",
                        background: "lightgrey",
                        borderRadius: "50px",
                        marginBottom: "15px",
                      }}
                    >
                      Arrival
                    </div>
                    <div>
                      <i
                        style={{ color: "#727272" }}
                        className="fas fa-fighter-jet"
                      ></i>
                    </div>
                    <div> {flightList?.arrival?.airport}</div>
                  </h5>
                  <div
                    style={{ color: "rgb(30, 30, 30)", fontSize: "14px" }}
                    className="card-text"
                  >
                    <div>IATA: {flightList?.arrival?.iata}</div>
                    <br />
                    <div>Time zone: {flightList?.arrival?.timezone}</div>
                    <div>
                      Scheduled:{" "}
                      {moment(flightList?.arrival?.scheduled).format(
                        "YYYY-MM-DD"
                      )}
                    </div>
                    <div>
                      Estimated:{" "}
                      {moment(flightList?.arrival?.estimated).format(
                        "YYYY-MM-DD"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted">
              <button
                onClick={() => onBook(flights)}
                className="btn btn-primary"
                disabled={loadingBooking}
              >
                {loadingBooking ? (
                  <i className="fa fa-spinner loader"></i>
                ) : null}
                Book
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {hasBooked && Object.keys(hasBooked).length > 0 ? (
        <div className="card text-center mt-4">
          <div className="card-header">Success</div>
          <div className="card-body">
            <h5 className="card-title">Booked Successfully</h5>
            <div className="card-text">
              Your flight has been booked Successfully
              <br />
              Find your book details in manage booking by this <br />
              id reference
              <br />
              <div
                style={{
                  fontSize: "20px",
                  margin: "15px 20px",
                  fontWeight: 700,
                  color: "#e74c3c",
                }}
              >
                {hasBooked?.bookingReference}
              </div>
              <div style={{ fontSize: "13px", margin: "15px 20px" }}>
                MAKE SURE YOU KEEP IT IN MIND, WRITE IT DOWN SOMEWHERE OR EVEN
                BETTER, PRINT THIS PAGE BEFORE CLOSING IT
              </div>
            </div>
            <button onClick={clear} className="btn btn-primary">
              ok
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
