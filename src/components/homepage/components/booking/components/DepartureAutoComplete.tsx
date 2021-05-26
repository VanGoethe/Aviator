import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "hooks";

interface Props {
  setDepartureIata: any;
  depValue: any;
}

export const DepartureAutoComplete = ({
  setDepartureIata,
  depValue,
}: Props) => {
  const { getCities } = useStoreActions((actions) => actions.booking);
  const { cities, loadingCities } = useStoreState((state) => state.booking);

  const [departure, setDerpature] = useState("");
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    console.log(departure);
    if (departure?.length >= 3) {
      getCities(departure);
    }
  }, [departure]);

  useEffect(() => {
    if (cities) {
      setCityData(cities);
    }
  }, [cities]);

  useEffect(() => {
    if (depValue) {
      setDerpature(depValue);
    }
  }, [depValue]);

  return (
    <>
      <label className="form-label">
        Departure airport{" "}
        <span>
          {loadingCities ? <i className="fa fa-spinner loader"></i> : null}
        </span>
      </label>
      <input
        className="form-control"
        list="departurelistOptions"
        placeholder="Type to search..."
        onChange={(el: any) => {
          setDepartureIata(el.target.value);
          setDerpature(el.target.value);
        }}
        width="100%"
        value={departure}
      />
      <datalist id="departurelistOptions">
        {cityData?.map((city: any, i: any) => (
          <option value={city.iata_code} key={city.iata_code}>
            {city.city_name}, ({city.iata_code}), {city.country_iso2}
          </option>
        ))}
      </datalist>
    </>
  );
};
