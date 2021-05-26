import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "hooks";

interface Props {
  setArrivalIata: any;
  arValue: any;
}

export const ArrivalAutoComplete = ({ setArrivalIata, arValue }: Props) => {
  const { getCities } = useStoreActions((actions) => actions.booking);
  const { cities, loadingCities } = useStoreState((state) => state.booking);

  const [arrival, setArrival] = useState("");
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    if (arrival?.length >= 3) {
      getCities(arrival);
    }
  }, [arrival]);

  useEffect(() => {
    if (cities) {
      setCityData(cities);
    }
  }, [cities]);

  useEffect(() => {
    if (arValue) {
      setArrival(arValue);
    }
  }, [arValue]);

  return (
    <>
      <label className="form-label">
        Arrival airport{" "}
        <span>
          {loadingCities ? <i className="fa fa-spinner loader"></i> : null}
        </span>
      </label>
      <input
        className="form-control"
        list="ArrivallistOptions"
        placeholder="Type to search..."
        onChange={(el: any) => {
          setArrivalIata(el.target.value);
          setArrival(el.target.value);
        }}
        width="100%"
        value={arrival}
      />
      <datalist id="ArrivallistOptions">
        {cityData?.map((city: any, i: any) => (
          <option value={city.iata_code} key={city.iata_code}>
            {city.city_name}, ({city.iata_code}), {city.country_iso2}
          </option>
        ))}
      </datalist>
    </>
  );
};
