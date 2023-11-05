import React from "react";
import "./Card.css";

const Card = ({ country }) => {
  return (
    <div className="Card">
      <img
        src={country.flags.png}
        alt="Flag of the Country"
        style={{
          width:
            country.name.official === "Federal Democratic Republic of Nepal"
              ? "55%"
              : "100%",
          height:
            country.name.official !== "Federal Democratic Republic of Nepal"
              ? "100%"
              : "100%",
        }}
      />
      <div className="Card-content">
        <h3>{country.name.official}</h3>
        <h4>
          <span>Population: </span>
          {country.population}
        </h4>
        <h4>
          <span>Region: </span>
          {country.region}
        </h4>
        <h4>
          <span>Capital City: </span>
          {country.capital}
        </h4>
      </div>
    </div>
  );
};

export default Card;
