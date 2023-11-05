import { Route, Routes } from "react-router-dom";
import "./App.css";
import CountryList from "./pages/Homepage";
import CountryDetails from "./pages/countrydetails/CountryDetails";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/alpha/:code" element={<CountryDetails />} />
        <Route path="/" element={<CountryList />} />
      </Routes>
    </div>
  );
}

export default App;
