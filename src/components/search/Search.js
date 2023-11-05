import React from "react";
import "../search/Search.css"

const Search = ({ onSearch }) => {
  const handleInputChange = (e) => {
    const query = e.target.value;
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by country name"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
