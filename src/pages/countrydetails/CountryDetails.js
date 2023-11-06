import React, { useEffect, useState } from "react";
import axios from "axios";
import "../countrydetails/CountryDetails.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Loading from "../../components/loadinganimation/Loading";

function CountryDetails() {
  const { code } = useParams();
  const [countryPage, setCountryPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((response) => {
        console.log(response.data);
        setCountryPage(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching country details:", error);
        setLoading(false);
      });
  }, [code]);

  const loadingDuration = 1000; 
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, loadingDuration);

    return () => clearTimeout(timeout);
  }, []);

  const backBtn = <BiArrowBack />;

  return (
    <div>
      {showLoading ? (
        <Loading />
      ) : loading ? (
        <p>Loading Country Details</p>
      ) : (
        <div className="Country-container">
          <div className="Back-wrapper">
            <Link to="/">
              <i>{backBtn}</i> Back
            </Link>
          </div>

          <div className="Country-wrapper">
            <div className="Image-wrapper">
              <img src={countryPage[0].flags.png} alt="Flag of the Country" />
            </div>
            <div className="Text-wrapper">
              <h1>{countryPage[0].name.official}</h1>
              <div className="Detail-text">
                <div className="First-text">
                  <h4>
                    Native Name:{" "}
                    {Object.values(countryPage[0]["name"]["nativeName"]).map(
                      (name, index) => (
                        <span key={index}>
                          {name.common}
                          {index <
                          Object.values(countryPage[0]["name"]["nativeName"])
                            .length -
                            1
                            ? ", "
                            : ""}
                        </span>
                      )
                    )}
                  </h4>
                  <h4>
                    Population: <span>{countryPage[0].population}</span>
                  </h4>
                  <h4>
                    Region: <span>{countryPage[0].region}</span>
                  </h4>
                  <h4>
                    Subregion:
                    <span> {countryPage[0].subregion} </span>
                  </h4>
                  <h4>
                    Capital: <span>{countryPage[0].capital}</span>
                  </h4>
                </div>
                <div className="Second-text">
                  <h4>
                    Time Zone: <span>{countryPage[0].timezones}</span>
                  </h4>
                  <h4>
                    Language(s):
                    <span>
                      {" "}
                      {Object.values(countryPage[0]["languages"]).join(", ")}
                    </span>
                  </h4>
                </div>
              </div>
              <div className="Borders">
                <h4>Borders:</h4>{" "}
                <div className="Border-wrapper">
                  {countryPage[0]["borders"]
                    ? countryPage[0]["borders"].map((border, index) => (
                        <span key={index} className="Border">
                          {border}
                          {index < countryPage[0]["borders"].length - 1
                            ? ", "
                            : ""}
                        </span>
                      ))
                    : "No bordering countries"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryDetails;
