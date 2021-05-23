import React, { useState } from "react";
import DatePicker from "react-datepicker";

interface Props {}

export const Booking = (props: Props) => {
  const [startDate, setStartDate] = useState(new Date());
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
        <div className="col col-lg-4 col-md-6 col-sm-12">
          <label className="form-label">Derpature airport</label>
          <input
            className="form-control"
            list="datalistOptions"
            placeholder="Type to search..."
          />
          <datalist id="datalistOptions">
            <option value="San Francisco"></option>
            <option value="New York"></option>
            <option value="Seattle"></option>
            <option value="Los Angeles"></option>
            <option value="Chicago"></option>
          </datalist>
        </div>
        <div className="col col-lg-4 col-md-6 col-sm-12">
          <label className="form-label">Arrival airport</label>
          <input
            className="form-control"
            list="datalistOptions"
            placeholder="Type to search..."
          />
          <datalist id="datalistOptions">
            <option value="San Francisco"></option>
            <option value="New York"></option>
            <option value="Seattle"></option>
            <option value="Los Angeles"></option>
            <option value="Chicago"></option>
          </datalist>
        </div>
        <div className="col col-lg-4 col-md-6 col-sm-12 ">
          <label className="form-label">Derpature date</label>
          <DatePicker
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
          />
        </div>
      </div>
      <div className="row pt-4">
        <div className="col col-lg-4 col-md-6 col-sm-12 ">
          <label className="form-label">Derpature airport</label>
          <div className="input-group mb-3">
            <input type="number" min="0" className="form-control" />
            <select className="form-select">
              <option selected value="1">
                Adults (12+ years)
              </option>
              <option value="2">Children (11- years)</option>
            </select>
          </div>
        </div>
        <div className="col col-lg-4 col-md-6 col-sm-12 ">
          <label className="form-label">Classes</label>
          <select className="form-select">
            <option selected>All classes</option>
            <option value="1">Business class</option>
            <option value="2">Economic class</option>
          </select>
        </div>
        <div className="col col-lg-4 col-md-6 col-sm-12 ">
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
        <button type="button" className="btn btn-dark">
          Search flight
        </button>
      </div>
    </div>
  );
};
