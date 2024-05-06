import React, { useState } from "react";
import "./App.css";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Asset Price",
      data: [100, 105, 110, 115, 120, 125],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const App = () => {
  const [chartData, setChartData] = useState(data);
  let initialDataPoint = 100;
  let previousDataPoint = initialDataPoint;
  let profitLoss = 0;

  const handleUpButtonClick = () => {
    const newDataPoint = previousDataPoint + Math.random() * 2 - 1;
    const color = newDataPoint > previousDataPoint ? "green" : "red";
    profitLoss += newDataPoint - previousDataPoint;
    previousDataPoint = newDataPoint;

    setChartData({
      ...chartData,
      labels: [...chartData.labels, chartData.labels.length],
      datasets: [
        {
          ...chartData.datasets[0],
          data: [...chartData.datasets[0].data, newDataPoint],
          borderColor: color,
        },
      ],
    });

    document.getElementById(
      "profit-loss"
    ).textContent = `Profit/Loss: ${profitLoss}`;
  };

  const handleDownButtonClick = () => {
    const newDataPoint = previousDataPoint - Math.random() * 2 + 1;
    const color = newDataPoint < previousDataPoint ? "green" : "red";
    profitLoss += newDataPoint - previousDataPoint;
    previousDataPoint = newDataPoint;

    setChartData({
      ...chartData,
      labels: [...chartData.labels, chartData.labels.length],
      datasets: [
        {
          ...chartData.datasets[0],
          data: [...chartData.datasets[0].data, newDataPoint],
          borderColor: color,
        },
      ],
    });

    document.getElementById(
      "profit-loss"
    ).textContent = `Profit/Loss: ${profitLoss}`;
  };

  return (
    <div className="App">
      <h1>Graph</h1>
      <div style={{ height: "400px", width: "600px" }}>
        <Line data={chartData} options={options} />
      </div>
      <button id="up-button" onClick={handleUpButtonClick}>
        Up
      </button>
      <button id="down-button" onClick={handleDownButtonClick}>
        Down
      </button>
      <div id="profit-loss">Profit/Loss: {profitLoss}</div>
    </div>
  );
};

export default App;
