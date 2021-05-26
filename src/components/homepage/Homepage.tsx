import React, { useState } from "react";
import { Booking, Checkin, ManageBooking } from "./components";

interface Props {}

export const Homepage = (props: Props) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="search-tabs search-tabs-bg mt-5">
          <h1>Find Your Perfect Trip</h1>
          <div className="card p-5">
            <Booking />
          </div>
        </div>
      </div>
    </div>
  );
};
