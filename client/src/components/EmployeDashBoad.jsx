import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import {
  Bar,
  Line,
  Pie,
  Doughnut,
  PolarArea,
  Radar,
  Scatter,
  Bubble,
} from "react-chartjs-2";

const EmployeDashBoad = () => {
  defaults.maintainAspectRatio = false;
  defaults.responsive = true;

  defaults.plugins.title.display = true;
  defaults.plugins.title.text = "";
  defaults.plugins.title.align = "start";
  defaults.plugins.title.font.size = 24;
  defaults.plugins.title.color = "black";
  return (
    <div className="max-w-3xl mx-auto h-[40vh]">
      <Line
        data={{
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: `Number of Votes ${new Date().getFullYear()}`,
              data: [12, 10, 3, 5, 2, 3],
              fill: true,
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],

              borderWidth: 1,
            },
            {
              label: "Efficiency",
              data: [8, 12, 14, 16, 22, 18, 26, 24, 20, 23, 19, 17],
              fill: true,
              borderColor: "rgba(153, 102, 255, 1)",
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderWidth: 2,
            },
            {
              label: "Efficiency",
              data: [18, 20, 14,  20, 23, 19, 17],
              fill: true,
              borderColor: "rgba(153, 102, 255, 1)",
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderWidth: 2,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default EmployeDashBoad;
