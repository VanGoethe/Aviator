import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { DepartureAutoComplete } from "../booking/components/DepartureAutoComplete";
import { ArrivalAutoComplete } from "../booking/components/ArrivalAutocomplete";
import { useStoreActions, useStoreState } from "hooks";
import moment from "moment";

interface Props {}

export const FlightInformation = (props: Props) => {
  const { searchFlights, clearBook } = useStoreActions(
    (action) => action.booking
  );
  const { loadingFlights, flights } = useStoreState((state) => state.booking);
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");

  const [flightList, setflightList] = useState({} as any);

  const onSearch = () => {
    const data = {
      dep_iata: departure,
      arr_iata: arrival,
    };
    setflightList({});
    searchFlights(data as any);
  };

  useEffect(() => {
    if (flights && Object.keys(flights).length > 0) {
      setflightList(flights);
    }
  }, [loadingFlights, flights]);

  const clear = () => {
    setDeparture("");
    setArrival("");
    setflightList({} as any);
    clearBook();
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="search-tabs search-tabs-bg mt-5">
          <h1>Flight Information</h1>
          <div className="card p-5">
            <div className="row">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                <DepartureAutoComplete
                  depValue={departure}
                  setDepartureIata={(val: string) => setDeparture(val)}
                />
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-6">
                <ArrivalAutoComplete
                  arValue={arrival}
                  setArrivalIata={(val: string) => setArrival(val)}
                />
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
            ) : flightList && Object.keys(flightList).length > 0 ? (
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
                          <div>
                            Time zone: {flightList?.departure?.timezone}
                          </div>
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
                          <div
                            style={{
                              fontSize: "14px",
                              color: "rgb(30, 30, 30)",
                            }}
                          >
                            Flight:{" "}
                            <span
                              style={{
                                fontSize: "20px !important",
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
                    <button onClick={clear} className="btn btn-primary">
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
