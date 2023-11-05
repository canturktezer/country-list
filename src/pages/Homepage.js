import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/countrycard/Card";
import Search from "../components/search/Search"
import Dropdown from "../components/dropdown/Dropdown";
import Loading from "../components/loadinganimation/Loading";
import Glow from "../components/glow/Glow";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
        setFilteredCountries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Handle changes in the search input
  const handleSearchInputChange = (query) => {
    setSearchQuery(query);

    const filtered = countries.filter((country) =>
      country.name.official.toLowerCase().includes(query.toLowerCase())
    );

    if (selectedRegion !== "All") {
      const regionFiltered = filtered.filter(
        (country) =>
          country.region.toLowerCase() === selectedRegion.toLowerCase()
      );
      setFilteredCountries(regionFiltered);
    } else {
      setFilteredCountries(filtered);
    }
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);

    if (region === "All") {
      setFilteredCountries(countries);
    } else {
      const regionFiltered = countries.filter(
        (country) => country.region.toLowerCase() === region.toLowerCase()
      );
      setFilteredCountries(regionFiltered);
    }
  };

  // Show loading for a specific duration (in milliseconds)
  const loadingDuration = 500; // 3 seconds
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, loadingDuration);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <div className="Home">
        <div className="Filter-wrapper">
          <Search onSearch={handleSearchInputChange} />
          <Dropdown onSelectRegion={handleRegionSelect} />
        </div>

        <div className="Country">
          {showLoading ? (
            <Loading />
          ) : loading ? (
            <p>Loading countries...</p>
          ) : filteredCountries === null ? (
            <p>No matching countries found.</p>
          ) : (
            filteredCountries.map((country) => (
              <Link
                style={{ textDecoration: "none" }}
                className="Link"
                to={`/alpha/${country.cca3}`}
                key={country.cca3}
              >
                <Card key={country.cca3} country={country} />
              </Link>
            ))
          )}
          
        </div>
        
      </div>
      <Glow />
    </div>
  );
}

export default CountryList;
