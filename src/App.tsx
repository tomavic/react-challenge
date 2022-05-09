import { useEffect, useState } from "react";
import axios from "axios";
import Select from "./components/Select";
import { Line } from "react-chartjs-2";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from "chart.js";
import React from "react";
import Spinner from "./components/Spinner";
import Navbar from "./components/Navbar";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export interface Data {
  id: string;
  month: string;
  camp: string;
  country: string;
  school: string;
  lessons: number;
}

function App() {

  const [loading, setLoading] = useState(true);
  const [selectedCountry, setCountry] = useState("");
  const [selectedCamp, setCamp] = useState("");
  const [selectedSchool, setSchool] = useState("");
  const [analysisData, setAnalysisData] = useState<Data[]>([]);
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json")
      .then((res) => setAnalysisData(res.data))
      .catch((err) => console.log(err));

    // to simulate api loading
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const countries = [...new Set<any>(analysisData.map((option) => option.country))];
  const camps = [...new Set(analysisData.filter((option) => selectedCountry === option.country).map((option) => option.camp))];
  const schools = [...new Set(analysisData.filter((option) => selectedCamp === option.camp).map((option) => option.school))];
  const datasets = [
    {
      label: selectedSchool,
      data: analysisData.filter((option) => selectedSchool === option.school).map((option) => option.lessons),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointStyle: "circle",
      pointRadius: 8,
      pointHoverRadius: 12,
    }
  ];


  const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => setCountry(e.target.value);
  const handleCampSelect = (e: React.ChangeEvent<HTMLSelectElement>) => setCamp(e.target.value);
  const handleSchoolSelect = (e: React.ChangeEvent<HTMLSelectElement>) => setSchool(e.target.value);

  const options: ChartOptions<any> = {
    pointBackgroundColor: "#fff",
    responsive: true,
    plugins: {
      legend: {
        title: {
          position: "start",
        },
        position: "right",
        labels: {
          usePointStyle: true,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 99, 132, 0.0)",
        },
      },
      y: {
        title: {
          display: true,
          text: "No. of Lessons",
        },
        grid: {
          drawBorder: false,
          color: "#000000",
        },
      },
    },
  };

  let data = {
    labels,
    datasets,
  };

  return (
    <div className="App">

      <Navbar />

      {loading ? <Spinner /> : (
        <div className="container">
          <div className="row my-4">
            <div className="col-4">
              <Select id="country" label="Select Country" disabled={false} options={countries} selectedValue={selectedCountry} handleOnSelect={handleCountrySelect} />
            </div>
            <div className="col-4">
              <Select id="camp" label="Select Camp" disabled={!selectedCountry} options={camps} selectedValue={selectedCamp} handleOnSelect={handleCampSelect} />
            </div>
            <div className="col-4">
              <Select id="school" label="Select School" disabled={!selectedCountry && !selectedCamp} options={schools} selectedValue={selectedSchool} handleOnSelect={handleSchoolSelect} />
            </div>
          </div>

          <div className="row my-4">
            {selectedSchool ? (
              <Line data={data} options={options} />
            ) : (
              <p className="alert alert-info" role="alert">
                Please select to view Analytics
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
