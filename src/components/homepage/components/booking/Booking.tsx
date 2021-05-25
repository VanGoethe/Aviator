import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { DepartureAutoComplete } from "./components";
import { ArrivalAutoComplete } from "./components/ArrivalAutocomplete";
import { useStoreActions, useStoreState } from "hooks";
import moment from "moment";

interface Props {}

export const Booking = (props: Props) => {
  const { searchFlights } = useStoreActions((action) => action.booking);
  const { loadingFlights, flights } = useStoreState((state) => state.booking);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [passenger, setPassenger] = useState((null as unknown) as any);
  const [Adult, setAdult] = useState("");
  const [classe, setClasse] = useState("");

  const onBook = () => {
    const data = {};
  };

  const onSearch = () => {
    const data = {
      dep_iata: departure,
      arr_iata: arrival,
    };
    searchFlights(data as any);
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
            setDepartureIata={(val: string) => setDeparture(val)}
          />
        </div>
        <div className="col col-12 col-sm-12 col-md-12 col-lg-4">
          <ArrivalAutoComplete
            setArrivalIata={(val: string) => setArrival(val)}
          />
        </div>
        <div className="col col-12 col-sm-12 col-md-12 col-lg-4">
          <div className="row">
            <div className="col-6">
              <label className="form-label">Derpature date</label>
              <DatePicker
                selected={startDate}
                onChange={(date: any) => setStartDate(date)}
                wrapperClassName="date-picker"
              />
            </div>
            <div className="col-6">
              <label className="form-label">Arrival date</label>
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
      ) : flights && Object.keys(flights).length > 0 ? (
        <div className="table-component mt-5">
          <div className="card text-center">
            <div className="card-header">Available flights</div>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title">
                    <div>
                      <i
                        style={{ color: "#727272" }}
                        className="fas fa-fighter-jet"
                      ></i>
                    </div>
                    <div>{flights?.departure?.airport}</div>
                  </h5>
                  <p
                    style={{ color: "rgb(30, 30, 30)", fontSize: "14px" }}
                    className="card-text"
                  >
                    <div>IATA: {flights?.departure?.iata}</div>
                    <br />
                    <div>Time zone: {flights?.departure?.timezone}</div>
                    <div>
                      Scheduled:{" "}
                      {moment(flights?.departure?.scheduled).format(
                        "YYYY-MM-DD"
                      )}
                    </div>
                    <div>
                      Estimated:{" "}
                      {moment(flights?.departure?.estimated).format(
                        "YYYY-MM-DD"
                      )}
                    </div>
                  </p>
                </div>
                <div
                  className="col"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="fas fa-arrow-circle-right"
                    style={{ fontSize: "30px" }}
                  ></i>
                </div>
                <div className="col">
                  <h5 className="card-title">
                    <div>
                      <i
                        style={{ color: "#727272" }}
                        className="fas fa-fighter-jet"
                      ></i>
                    </div>
                    <div> {flights?.arrival?.airport}</div>
                  </h5>
                  <p
                    style={{ color: "rgb(30, 30, 30)", fontSize: "14px" }}
                    className="card-text"
                  >
                    <div>IATA: {flights?.arrival?.iata}</div>
                    <br />
                    <div>Time zone: {flights?.arrival?.timezone}</div>
                    <div>
                      Scheduled:{" "}
                      {moment(flights?.arrival?.scheduled).format("YYYY-MM-DD")}
                    </div>
                    <div>
                      Estimated:{" "}
                      {moment(flights?.arrival?.estimated).format("YYYY-MM-DD")}
                    </div>
                  </p>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted">
              <button className="btn btn-primary">Book</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
