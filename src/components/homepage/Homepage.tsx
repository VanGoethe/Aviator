import React, { useState } from "react";
import { Booking, Checkin, ManageBooking } from "./components";

interface Props {}

export const Homepage = (props: Props) => {
  const [isBook, setIsBook] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const [isManage, setIsManage] = useState(false);
  const [isInfo, setIsInfo] = useState(false);

  const setActiveTab = (tab: string) => {
    switch (tab) {
      case "booking":
        setIsBook(true);
        setIsCheck(false);
        setIsManage(false);
        setIsInfo(false);
        break;
      case "checkin":
        setIsBook(false);
        setIsCheck(true);
        setIsManage(false);
        setIsInfo(false);
        break;
      case "manage":
        setIsBook(false);
        setIsCheck(false);
        setIsManage(true);
        setIsInfo(false);
        break;
      case "info":
        setIsBook(false);
        setIsCheck(false);
        setIsManage(false);
        setIsInfo(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="search-tabs search-tabs-bg mt-5">
          <h1>Find Your Perfect Trip</h1>
          <div className="tabbable">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <a
                  className={`nav-link ${isBook ? `active` : ""}`}
                  data-toggle="tab"
                  href="#checkin"
                  role="tab"
                  onClick={() => setActiveTab("booking")}
                >
                  <i className="fa fa-address-card"></i> <span>Booking</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${isCheck ? `active` : ""}`}
                  data-toggle="tab"
                  href="#checkin"
                  role="tab"
                  onClick={() => setActiveTab("checkin")}
                >
                  <i className="fa fa-address-card"></i> <span>Check-in</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${isManage ? `active` : ""}`}
                  data-toggle="tab"
                  href="#manage"
                  role="tab"
                  onClick={() => setActiveTab("manage")}
                >
                  <i className="fa fa-calendar"></i> <span>manage booking</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${isInfo ? `active` : ""}`}
                  data-toggle="tab"
                  href="#info"
                  role="tab"
                  onClick={() => setActiveTab("info")}
                >
                  <i className="fa fa-info-circle"></i>{" "}
                  <span>Flight information</span>
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div
                className={`tab-pane ${isBook ? `active` : ""}`}
                id="flights"
                role="tabpanel"
              >
                <Booking />
              </div>
              <div
                className={`tab-pane ${isCheck ? `active` : ""}`}
                id="checkin"
                role="tabpanel"
              >
                <Checkin />
                {/* <div>Check-in system is coming soon...</div> */}
              </div>
              <div
                className={`tab-pane ${isManage ? `active` : ""}`}
                id="manage"
                role="tabpanel"
              >
                <ManageBooking />
                {/* <div>Manage booking system is coming soon...</div> */}
              </div>
              <div
                className={`tab-pane ${isInfo ? `active` : ""}`}
                id="info"
                role="tabpanel"
              >
                {/* <HotelSearch /> */}
                <div>Flight information system is coming soon...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
