import React from "react";

interface Props {}

export const ManageBooking = (props: Props) => {
  return (
    <div>
      <p>
        Manage your Inashaza Flight Booking Service by providing the Six-Digit
        alphabet Code on your Booking Confirmation and Retrieve your Booking.
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
              />
            </div>
          </div>
          <div className="col" style={{ padding: "0 15px" }}>
            <label className="sr-only">Last Name</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Jane Doe"
            />
          </div>
          <div className="col" style={{ padding: "0 15px" }}>
            <button type="submit" className="btn btn-primary mb-2">
              Retrieve booking
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
