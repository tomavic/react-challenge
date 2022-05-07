import { useEffect, useState } from "react";
import axios from "axios";
import Select from "./components/Select";

function App() {
  const title = "Analysis Chart";

  const [loading, setLoading] = useState(true);
  const [selectedCountry, setCountry] = useState("");
  const [selectedCamp, setCamp] = useState("");
  const [selectedSchool, setSchool] = useState("");
  const [analysisData, setAnalysisData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("../db/data.json")
      .then((res) => setAnalysisData(res.data))
      .catch((err) => console.log(err));

    // to simulate api loading
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const countries = [...new Set(analysisData.map((option) => option.country))];
  const camps = [...new Set(analysisData.map((option) => option.camp))];
  const schools = [...new Set(analysisData.map((option) => option.school))];

  const handleCountrySelect = (e) => setCountry(e.target.value);
  const handleCampSelect = (e) => setCamp(e.target.value);
  const handleSchoolSelect = (e) => setSchool(e.target.value);

  return (
    <div className="App">
      <h1 className="m-3">{title}</h1>

      <div className="container">
        <div className="row">
          <div className="col-4">
            <Select id="country" label="Select Country" loading={loading} options={countries} selectedValue={selectedCountry} handleOnSelect={handleCountrySelect} />
          </div>
          <div className="col-4">
            <Select id="camp" label="Select Camp" loading={loading} options={camps} selectedValue={selectedCamp} handleOnSelect={handleCampSelect} />
          </div>
          <div className="col-4">
            <Select id="school" label="Select School" loading={loading} options={schools} selectedValue={selectedSchool} handleOnSelect={handleSchoolSelect} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
