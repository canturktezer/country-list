import { useState, useEffect, useRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import "../dropdown/Dropdown.css";

export default function Dropdown({ onSelectRegion }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  // Add a click event listener to the document
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const upArrowBtn = openDropdown ? <BiChevronUp /> : <BiChevronDown />;

  return (
    <div className="Dropdown-container" ref={dropdownRef} onClick={toggleDropdown}>
      <ul>
        <li>
          <span>Filter by Region</span>
          <span className="Down-arrow">
            <i>{upArrowBtn}</i>
          </span>
          <ul className={`Sub-items ${openDropdown ? "Open" : ""} `}>
            <li onClick={() => onSelectRegion("All")}>
              <span>All</span>
            </li>
            <li onClick={() => onSelectRegion("Africa")}>
              <span>Africa</span>
            </li>
            <li onClick={() => onSelectRegion("Americas")}>
              <span>Americas</span>
            </li>
            <li onClick={() => onSelectRegion("Asia")}>
              <span>Asia</span>
            </li>
            <li onClick={() => onSelectRegion("Europe")}>
              <span>Europe</span>
            </li>
            <li onClick={() => onSelectRegion("Oceania")}>
              <span>Oceania</span>
            </li>
            <li onClick={() => onSelectRegion("Antarctic")}>
              <span>Antarctic</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
